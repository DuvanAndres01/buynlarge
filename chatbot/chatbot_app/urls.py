from django.urls import path
from .views import chatbot, product_metrics
from .product_api import obtener_productos


urlpatterns = [
    path("chatbot/", chatbot),
    path('productos/', obtener_productos, name='obtener_productos'),
    path('api/metricas/', product_metrics, name='metricas'),

]
