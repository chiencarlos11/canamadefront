from django.shortcuts import render
from django.http import JsonResponse
from core.models import *
import json
from django.core import serializers
from django.shortcuts import get_object_or_404, render

# Create your views here.
def details(request):

	orders = Laurent.objects.all()

	serialized_obj = serializers.serialize('json', orders)

	return JsonResponse(json.loads(serialized_obj), safe=False)

def printable(request):

	orders = Laurent.objects.all()
	return render(request, 'print.html', {'orders': orders})

