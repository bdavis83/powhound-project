# Generated by Django 4.2 on 2023-05-17 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0002_favorites_is_favorite'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorites',
            name='text',
        ),
    ]
