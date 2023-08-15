from crypt import methods
import datetime
from email import message
from http.client import OK
from urllib import response
from django.shortcuts import get_object_or_404,get_list_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from employee.serializer import ProductSerializers
from .models import Employee
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def Employees(request):
    queryset=Employee.objects.all()
    serializer=ProductSerializers(queryset,many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET','PATCH','DELETE'])
def Employees_by_id(request):
    managerId=request.GET.get('managerid')
    employeeId=request.GET.get('employeeid')
    if request.method=='GET':
        if managerId!=None:
            print(Employee.objects.filter(managerid=managerId))
            employee=get_list_or_404(Employee,managerid=managerId)
            serializer=ProductSerializers(employee,many=True)
            return Response(serializer.data)
        elif employeeId!=None:
            print(Employee.objects.filter(employeeid=employeeId))
            employee=get_object_or_404(Employee,employeeid=employeeId)
            serializer=ProductSerializers(employee)
            return Response(serializer.data)
        else:
            return Response('enter Employeeid')
    elif request.method=='PATCH':
        if employeeId!=None:
            employee=get_object_or_404(Employee,employeeid=employeeId)
            serializer=ProductSerializers(employee,data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
               serializer.save()
            return Response(serializer.data)
    elif request.method=='DELETE':
            if employeeId!=None:
                employee=get_object_or_404(Employee,employeeid=employeeId)
                data={
                    "exitdate":datetime.date.today(),
                    "status":"N"
                }
                serializer=ProductSerializers(employee,data=data,partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                return Response(serializer.data)
            else:
                return Response(message="Please enter Employeeid")
            


# @api_view(['GET'])
# def Employees_by_id(request,managerid):
#         employee=get_object_or_404(Employee,managerid=id)
#         if request.method=='GET':
#             serializer=ProductSerializers(employee)
#             return Response(serializer.data)


