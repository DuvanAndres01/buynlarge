from django.urls import path
from .views import product_metrics

urlpatterns = [
    path("stats/", product_metrics, name="product-metrics"),
]
