from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('cme.usuarios.urls')),
    path('', include('cme.materiais.urls')),
]
