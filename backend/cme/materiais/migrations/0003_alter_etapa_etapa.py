# Generated by Django 5.2 on 2025-04-29 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materiais', '0002_etapa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='etapa',
            name='etapa',
            field=models.CharField(choices=[('Recebimento', 'Recebimento'), ('Lavagem', 'Lavagem'), ('Esterelização', 'Esterelizacao'), ('Distribuição', 'Distribuicao')], default='Recebimento'),
        ),
    ]
