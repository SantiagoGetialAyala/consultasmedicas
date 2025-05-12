from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.decorators import action

from .repositories import (
    PacienteRepository, MedicoRepository, ConsultaRepository,
    InasistenciaRepository, EspecialidadRepository
)

from .serializers import (
    PacienteSerializer, MedicoSerializer, ConsultaSerializer,
    InasistenciaSerializer, EspecialidadSerializer
)

# Repositorios
paciente_repo = PacienteRepository()
medico_repo = MedicoRepository()
consulta_repo = ConsultaRepository()
inasistencia_repo = InasistenciaRepository()
especialidad_repo = EspecialidadRepository()


class BaseViewSet(viewsets.ViewSet):
    """Clase base para manejar operaciones CRUD comunes."""
    
    def handle_repository_action(self, action, pk=None, data=None, model_name=None):
        """Método para manejar acciones de repositorio y errores comunes"""
        if action == "create":
            instance = getattr(self.repo, action)(data)
        else:
            instance = getattr(self.repo, action)(pk, data)
        
        if not instance:
            raise NotFound(f"{model_name} no encontrado para {action}.")
        
        return instance


class PacienteViewSet(BaseViewSet):
    repo = paciente_repo

    def list(self, request):
        pacientes = paciente_repo.get_all()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        paciente = self.handle_repository_action("get_by_id", pk, model_name="Paciente")
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)

    def create(self, request):
        paciente = self.handle_repository_action("create", data=request.data, model_name="Paciente")
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        paciente = self.handle_repository_action("update", pk, request.data, model_name="Paciente")
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        deleted = paciente_repo.delete(pk)
        if not deleted:
            raise NotFound("Paciente no encontrado para eliminar.")
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicoViewSet(BaseViewSet):
    repo = medico_repo

    def list(self, request):
        medicos = medico_repo.get_all()
        serializer = MedicoSerializer(medicos, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        medico = self.handle_repository_action("get_by_id", pk, model_name="Médico")
        serializer = MedicoSerializer(medico)
        return Response(serializer.data)

    def create(self, request):
        if not request.data.get('nombre') or not request.data.get('cedula_profesional') or not request.data.get('especialidad') or not request.data.get('horario'):
            raise ValidationError("Faltan datos requeridos para crear el médico.")
        
        especialidad_id = request.data.get('especialidad')
        if not EspecialidadRepository().get_by_id(especialidad_id):
            raise ValidationError("La especialidad proporcionada no es válida.")

        medico = self.handle_repository_action("create", data=request.data, model_name="Médico")
        serializer = MedicoSerializer(medico)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        medico = self.handle_repository_action("update", pk, request.data, model_name="Médico")
        serializer = MedicoSerializer(medico)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        deleted = medico_repo.delete(pk)
        if not deleted:
            raise NotFound("Médico no encontrado para eliminar.")
        return Response(status=status.HTTP_204_NO_CONTENT)


class ConsultaViewSet(BaseViewSet):
    repo = consulta_repo

    def list(self, request):
        consultas = consulta_repo.get_all()
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        consulta = self.handle_repository_action("get_by_id", pk, model_name="Consulta")
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data)

    def create(self, request):
        consulta = self.handle_repository_action("create", data=request.data, model_name="Consulta")
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        consulta = self.handle_repository_action("update", pk, request.data, model_name="Consulta")
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        deleted = consulta_repo.delete(pk)
        if not deleted:
            raise NotFound("Consulta no encontrada para eliminar.")
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"])
    def por_paciente(self, request):
        paciente_id = request.query_params.get("paciente_id")
        if not paciente_id:
            return Response({"error": "Falta el parámetro paciente_id."}, status=status.HTTP_400_BAD_REQUEST)
        
        consultas = consulta_repo.get_consultas_por_paciente(paciente_id)
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)


class InasistenciaViewSet(BaseViewSet):
    repo = inasistencia_repo

    def list(self, request):
        inasistencias = inasistencia_repo.get_all()
        serializer = InasistenciaSerializer(inasistencias, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        inasistencia = self.handle_repository_action("get_by_id", pk, model_name="Inasistencia")
        serializer = InasistenciaSerializer(inasistencia)
        return Response(serializer.data)

    def create(self, request):
        inasistencia = self.handle_repository_action("create", data=request.data, model_name="Inasistencia")
        serializer = InasistenciaSerializer(inasistencia)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        inasistencia = self.handle_repository_action("update", pk, request.data, model_name="Inasistencia")
        serializer = InasistenciaSerializer(inasistencia)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        deleted = inasistencia_repo.delete(pk)
        if not deleted:
            raise NotFound("Inasistencia no encontrada para eliminar.")
        return Response(status=status.HTTP_204_NO_CONTENT)


class EspecialidadViewSet(BaseViewSet):
    repo = especialidad_repo

    def list(self, request):
        especialidades = especialidad_repo.get_all()
        serializer = EspecialidadSerializer(especialidades, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        especialidad = self.handle_repository_action("get_by_id", pk, model_name="Especialidad")
        serializer = EspecialidadSerializer(especialidad)
        return Response(serializer.data)

    def create(self, request):
        especialidad = self.handle_repository_action("create", data=request.data, model_name="Especialidad")
        serializer = EspecialidadSerializer(especialidad)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        especialidad = self.handle_repository_action("update", pk, request.data, model_name="Especialidad")
        serializer = EspecialidadSerializer(especialidad)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        deleted = especialidad_repo.delete(pk)
        if not deleted:
            raise NotFound("Especialidad no encontrada para eliminar.")
        return Response(status=status.HTTP_204_NO_CONTENT)
