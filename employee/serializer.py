from itertools import product
from rest_framework import serializers
from decimal import Decimal

from employee.models import Employee

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=['firstname','lastname','employeeid','bonuspercent','managerid','exitdate','status']


