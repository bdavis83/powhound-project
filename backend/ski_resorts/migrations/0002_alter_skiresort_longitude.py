# Generated by Django 4.2 on 2023-04-27 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ski_resorts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skiresort',
            name='longitude',
            field=models.DecimalField(decimal_places=4, max_digits=8),
        ),
    ]