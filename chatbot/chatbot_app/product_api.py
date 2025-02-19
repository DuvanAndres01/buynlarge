# product_api.py
from django.http import JsonResponse
from .models import Producto

def obtener_productos(request):
    # Consulta los productos desde la base de datos
    productos = Producto.objects.all().values('id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen_url')
    # Convertir la consulta a lista y retornar como JSON
    return JsonResponse(list(productos), safe=False)
