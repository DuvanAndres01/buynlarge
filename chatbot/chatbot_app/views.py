import unicodedata
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Producto
from transformers import pipeline

# Cargar el modelo preentrenado de transformers para NLP
nlp_model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Categorías que el chatbot puede reconocer
categorias = ["precio", "descripcion", "cantidad", "informacion", "marca", "grafica", "rendimiento", "mejor"]

# Función para eliminar tildes de una cadena
def quitar_tildes(texto):
    return ''.join(c for c in unicodedata.normalize('NFD', texto) if unicodedata.category(c) != 'Mn')

@api_view(['POST'])
def chatbot(request):
    pregunta = request.data.get("mensaje", "").lower()
    
    # Normalizar la pregunta eliminando tildes
    pregunta = quitar_tildes(pregunta)

    # Usar el modelo NLP para identificar la intención de la pregunta
    intent = nlp_model(pregunta, candidate_labels=categorias)
    categoria = intent["labels"][0]  # Obtener la categoría más probable

    # Inicializar la variable de producto en la pregunta
    producto_en_pregunta = None
    marca_en_pregunta = None
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos

    # Revisar si alguno de los nombres de los productos o marcas aparece en la pregunta
    for producto in productos:
        if producto.nombre.lower() in pregunta:
            producto_en_pregunta = producto
            break

    # Detectar marcas en la pregunta
    marcas = list(set([p.nombre.split()[0].lower() for p in productos]))  # Obtener marcas únicas de los productos
    for marca in marcas:
        if marca in pregunta:
            marca_en_pregunta = marca
            break

    # Pregunta sobre "más barato" o "más caro"
    if "más barato" in pregunta or "más caro" in pregunta or "más costoso" in pregunta:
        if marca_en_pregunta:
            productos_marca = Producto.objects.filter(nombre__icontains=marca_en_pregunta)
            if productos_marca.exists():
                if "más barato" in pregunta or "computador más barato" in pregunta:
                    producto_mas_barato = min(productos_marca, key=lambda p: p.precio)
                    respuesta = f"El producto más barato de la marca {marca_en_pregunta} es {producto_mas_barato.nombre}, con un precio de {producto_mas_barato.precio}."
                elif "más caro" in pregunta or "más costoso" in pregunta:
                    producto_mas_caro = max(productos_marca, key=lambda p: p.precio)
                    respuesta = f"El producto más caro de la marca {marca_en_pregunta} es {producto_mas_caro.nombre}, con un precio de {producto_mas_caro.precio}."
            else:
                respuesta = f"No tengo productos de la marca {marca_en_pregunta} en inventario."
        else:
            respuesta = "Por favor, menciona una marca para buscar el producto más barato o más caro."

    # Pregunta sobre "mejor gráfica" o "mejor rendimiento"
    elif "mejor grafica" in pregunta or "mejor rendimiento" in pregunta or "mejor computadora" in pregunta:
        if producto_en_pregunta:
            respuesta = f"El {producto_en_pregunta.nombre} tiene una excelente gráfica, ideal para juegos y tareas gráficas intensivas."
        elif marca_en_pregunta:
            productos_marca = Producto.objects.filter(nombre__icontains=marca_en_pregunta)
            if productos_marca.exists():
                # Suponiendo que la mejor gráfica esté asociada con un modelo que tenga un atributo 'grafica'
                mejor_grafica_producto = max(productos_marca, key=lambda p: p.grafica if hasattr(p, 'grafica') else 0)
                respuesta = f"El producto con la mejor gráfica de la marca {marca_en_pregunta} es {mejor_grafica_producto.nombre}."
            else:
                respuesta = f"No tengo productos de la marca {marca_en_pregunta} con buenas gráficas."
        else:
            respuesta = "Por favor, menciona una marca o producto para conocer la mejor gráfica."

    # Procesamiento de la categoría "precio"
    elif categoria == "precio" or "cuánto vale" in pregunta or "cuál es el precio" in pregunta:
        if producto_en_pregunta:
            # Si encontramos el producto, devolver su precio
            respuesta = f"El {producto_en_pregunta.nombre} cuesta {producto_en_pregunta.precio}."
        elif marca_en_pregunta:
            # Si encontramos una marca, devolver los precios de los productos de esa marca
            productos_marca = Producto.objects.filter(nombre__icontains=marca_en_pregunta)
            if productos_marca.exists():
                respuesta = [f"{p.nombre}: {p.precio}" for p in productos_marca]
            else:
                respuesta = f"No tengo productos de la marca {marca_en_pregunta} en inventario."
        else:
            respuesta = "No pude encontrar el producto o marca que mencionas."

    # Procesamiento de "características" de un producto
    elif "caracteristicas" in pregunta or "especificaciones" in pregunta:
        if producto_en_pregunta:
            # Si encontramos el producto, devolver sus características
            respuesta = f"Características de {producto_en_pregunta.nombre}: {producto_en_pregunta.descripcion if producto_en_pregunta.descripcion else 'No disponible'}."
        elif marca_en_pregunta:
            # Si encontramos una marca, devolver las características de los productos de esa marca
            productos_marca = Producto.objects.filter(nombre__icontains=marca_en_pregunta)
            if productos_marca.exists():
                respuesta = [f"{p.nombre}: {p.descripcion if p.descripcion else 'Sin descripción'}" for p in productos_marca]
            else:
                respuesta = f"No tengo productos de la marca {marca_en_pregunta} en inventario."
        else:
            respuesta = "No pude encontrar el producto o marca que mencionas."

    # Procesamiento de la categoría "cantidad" o "disponibilidad"
    elif categoria == "cantidad" or categoria == "stock" or categoria == "disponibilidad":
        if producto_en_pregunta:
            # Si encontramos el producto, devolver su cantidad disponible
            respuesta = f"Actualmente hay {producto_en_pregunta.stock} unidades de {producto_en_pregunta.nombre} en inventario."
        elif marca_en_pregunta:
            # Si encontramos una marca, devolver la cantidad de productos de esa marca en inventario (no sumar el stock, sino contar los productos)
            productos_marca = Producto.objects.filter(nombre__icontains=marca_en_pregunta)
            cantidad_productos_marca = productos_marca.count()  # Contamos los productos de la marca
            if cantidad_productos_marca > 0:
                respuesta = f"Actualmente hay {cantidad_productos_marca} productos de la marca {marca_en_pregunta} en inventario."
            else:
                respuesta = f"No tengo productos de la marca {marca_en_pregunta} en inventario."
        else:
            # Si no se menciona un producto específico ni marca, devolver el total de inventario
            cantidad_productos = Producto.objects.count()
            respuesta = f"Actualmente hay {cantidad_productos} productos en el inventario."

    else:
        respuesta = "No entiendo la pregunta. Intenta preguntar sobre precios, descripciones, disponibilidad o cantidad de productos."

    return Response({"respuesta": respuesta})

# Métricas de los productos
def product_metrics(request):
    productos = Producto.objects.all()
    
    total_stock = sum(p.stock for p in productos)
    
    product_counts = [{"name": p.nombre, "stock": p.stock} for p in productos]
    
    category_counts = {}  # Aquí puedes agrupar por categorías si tienes el campo
    for p in productos:
        category = p.categoria if hasattr(p, 'categoria') else "Otros"
        category_counts[category] = category_counts.get(category, 0) + 1
    
    category_counts = [{"category": k, "count": v} for k, v in category_counts.items()]
    
    return JsonResponse({"totalStock": total_stock, "productCounts": product_counts, "categoryCounts": category_counts})
