from django.urls import path
from . import views

urlpatterns= [
    path('employees/',views.Employees),
    path('employee',views.Employees_by_id),
    # path('employees/<int:managerid>/',views.Employees_by_id),
]