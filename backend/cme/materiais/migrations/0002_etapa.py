# Generated by Django 5.2 on 2025-04-28 23:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('materiais', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Etapa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('etapa', models.IntegerField(choices=[('Recebimento', 'Recebimento'), ('Lavagem', 'Lavagem'), ('Esterelização', 'Esterelizacao'), ('Distribuição', 'Distribuicao')], default='Recebimento')),
                ('quant_recebido', models.IntegerField(default=0)),
                ('quant_lavagem', models.IntegerField(default=0)),
                ('quant_esterilizacao', models.IntegerField(default=0)),
                ('quant_distribuicao', models.IntegerField(default=0)),
                ('serial', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='materiais.material', to_field='serial')),
            ],
        ),
    ]
