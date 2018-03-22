from django.db import models as m
from django.utils import timezone

# Create your models here.
class ControlSize(m.Model):
	size = m.CharField(max_length=50)

	def __unicode__(self):
		return str(self.size)

	def __str__(self):
		return str(self.size)

class CassetteColor(m.Model):
	name = m.CharField(max_length=50)

	def __unicode__(self):
		return self.name

	def __str__(self):
		return str(self.name)

class ControlType(m.Model):
	name = m.CharField(max_length=50)

	def __unicode__(self):
		return self.name

	def __str__(self):
		return str(self.name)


class ControlPosition(m.Model):
	name = m.CharField(max_length=50)

	def __unicode__(self):
		return self.name

	def __str__(self):
		return str(self.name)

class Fabric(m.Model):
	name = m.CharField(max_length=50)

	def __unicode__(self):
		return self.name

	def __str__(self):
		return self.name

class FabricColor(m.Model):
	name = m.CharField(max_length=50)
	fabric = m.ForeignKey(Fabric, on_delete=m.DO_NOTHING)

	def __unicode__(self):
		return str(self.fabric) + " " + self.name

	def __str__(self):
		return str(self.fabric) + " " + self.name

class Blind(m.Model):
	ponumber = m.CharField(max_length=256, default='New Client')
	original_width = m.FloatField()
	original_height = m.FloatField()
	date_created = m.DateTimeField(default=timezone.now())

	def __unicode__(self):
		return str(self.ponumber)

	def __str__(self):
		return str(self.ponumber)

class Laurent(Blind):

	cassette = m.FloatField(blank=True, null=True)
	tube_bod = m.FloatField(blank=True, null=True)
	inner = m.FloatField(blank=True, null=True)
	outer = m.FloatField(blank=True, null=True)
	height = m.FloatField(blank=True, null=True)
	control_size = m.ForeignKey(ControlSize, on_delete=m.DO_NOTHING)
	control_type = m.ForeignKey(ControlType, on_delete=m.DO_NOTHING)
	control_position = m.ForeignKey(ControlPosition, on_delete=m.DO_NOTHING)
	cassette_color = m.ForeignKey(CassetteColor, on_delete=m.DO_NOTHING)
	fabric = m.ForeignKey(FabricColor, on_delete=m.DO_NOTHING)



