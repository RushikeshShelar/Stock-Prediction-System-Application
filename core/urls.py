"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path,include

from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
     path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', confirm_logout_view, name='confirm_logout'),  # Use the confirmation view if implemented
    path('signup/', signup_view, name='signup'),  # Add this line for signup
    path('', index, name="index"),
    path('search/', search),
    path('predict/<str:ticker_value>/<str:number_of_days>/', predict),
    path('ticker/', ticker, name='ticker'),
    path('news/',news),
    path('learn/', education),
    path('news/all',all_news),
    path('watchlist/', watchlist, name='watchlist'),
    path('watchlist/add/', add_to_watchlist, name='add_to_watchlist'),
    path('watchlist/remove/<str:ticker>/', remove_from_watchlist, name='remove_from_watchlist'),
    path('forums/', forum_list, name='forum_list'),  
    path('forums/<int:forum_id>/', forum_detail, name='forum_detail'),  
    path('message/delete/<int:message_id>/', delete_message, name='delete_message'),
]