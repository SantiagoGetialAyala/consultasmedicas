from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PacienteViewSet, MedicoViewSet, ConsultaViewSet, InasistenciaViewSet, EspecialidadViewSet

# Crear el router y registrar los ViewSets
router = DefaultRouter()
router.register(r'pacientes', PacienteViewSet, basename='paciente')
router.register(r'medicos', MedicoViewSet, basename='medico')
router.register(r'consultas', ConsultaViewSet, basename='consulta')
router.register(r'inasistencias', InasistenciaViewSet, basename='inasistencia')
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')

# Definir las rutas
urlpatterns = [
    path('api/', include(router.urls)),  # Prefijo 'api/' para las rutas de la API
]
