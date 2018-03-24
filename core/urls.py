from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [

    path('details/', views.details),
    path('print/', views.printable),
]