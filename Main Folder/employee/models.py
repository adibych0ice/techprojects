from ast import Or
from pyexpat import model
from django.db import models

# Create your models here.

class Employee(models.Model):
    firstname=models.CharField(max_length=30)
    lastname=models.CharField(max_length=30)
    hiredate=models.DateField()
    exitdate=models.DateField()
    managerid=models.IntegerField()
    employeeid=models.IntegerField(primary_key=True)
    salary=models.IntegerField()
    bonuspercent=models.IntegerField()
    status=models.CharField(max_length=1)