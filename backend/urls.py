from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from accounts.views import ProfileView
urlpatterns = [
    path('admin/',admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/users/me/profile', ProfileView.as_view(), name= "profile"),
    path('', include('posts.api.urls')),
]
urlpatterns+= [re_path(r'^(?!media).*', TemplateView.as_view(template_name="index.html"))]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)