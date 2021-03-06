# Generated by Django 2.0.3 on 2018-03-22 02:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blind',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_width', models.FloatField()),
                ('original_height', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='CassetteColor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ControlSize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Fabric',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='FabricColor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('fabric', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.Fabric')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ponumber', models.CharField(max_length=256)),
                ('customer_name', models.CharField(max_length=256)),
                ('date_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Laurent',
            fields=[
                ('blind_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='core.Blind')),
                ('cassette', models.FloatField()),
                ('tube_bod', models.FloatField()),
                ('inner', models.FloatField()),
                ('outer', models.FloatField()),
                ('height', models.FloatField()),
                ('cassette_color', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.CassetteColor')),
                ('control_size', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.ControlSize')),
                ('fabric', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.Fabric')),
            ],
            bases=('core.blind',),
        ),
        migrations.AddField(
            model_name='blind',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.Order'),
        ),
    ]
