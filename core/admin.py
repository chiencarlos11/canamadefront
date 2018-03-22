from django.contrib import admin
from core.models import *

# Register your models here.

class CassetteColorAdmin(admin.ModelAdmin):
	fields = ['name']
	list_display = ['name']

class ControlSizeAdmin(admin.ModelAdmin):
	fields = ['size']
	list_display = ['size']

class ControlTypeAdmin(admin.ModelAdmin):
	fields = ['name']
	list_display = ['name']

class ControlPositionAdmin(admin.ModelAdmin):
	fields = ['name']
	list_display = ['name']

class FabricColorAdmin(admin.ModelAdmin):
	fields = ['name','fabric']
	list_display = ['name','fabric']

class FabricAdmin(admin.ModelAdmin):
	fields = ['name']
	list_display = ['name']

class LaurentAdmin(admin.ModelAdmin):
	list_display = ['ponumber','original_width','original_height','cassette','tube_bod','inner','outer','height','control_size','control_type','control_position','cassette_color','fabric']

	def save_model(self, request, obj, form, change):
		obj.cassette = obj.original_width - 0.375
		obj.tube_bod = obj.cassette - 1
		obj.inner = obj.tube_bod - 0.25
		obj.outer = obj.tube_bod + 0.125
		if obj.fabric.fabric.name == 'Laurent':
			obj.height = obj.original_height + 3.875
		obj.save()

admin.site.register(ControlSize, ControlSizeAdmin)
admin.site.register(ControlType, ControlTypeAdmin)
admin.site.register(ControlPosition, ControlPositionAdmin)
admin.site.register(CassetteColor, CassetteColorAdmin)
admin.site.register(Fabric, FabricAdmin)
admin.site.register(FabricColor, FabricColorAdmin)
admin.site.register(Laurent,LaurentAdmin)