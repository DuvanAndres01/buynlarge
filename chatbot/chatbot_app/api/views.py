from django.http import JsonResponse
from .models import Producto

def product_metrics(request):
    productos = Producto.objects.all()
    
    total_stock = sum(p.stock for p in productos)
    
    product_counts = [{"name": p.nombre, "stock": p.stock} for p in productos]
    
    category_counts = {}
    for p in productos:
        category = p.categoria if hasattr(p, 'categoria') else "Otros"
        category_counts[category] = category_counts.get(category, 0) + 1
    
    category_counts = [{"category": k, "count": v} for k, v in category_counts.items()]
    
    return JsonResponse({"totalStock": total_stock, "productCounts": product_counts, "categoryCounts": category_counts})
