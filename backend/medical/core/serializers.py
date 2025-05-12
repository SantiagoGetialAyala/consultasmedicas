from rest_framework import serializers
from .models import Especialidad, Medico, Paciente, Consulta, Inasistencia

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    especialidad = serializers.PrimaryKeyRelatedField(queryset=Especialidad.objects.all())
    
    class Meta:
        model = Medico
        fields = '__all__'


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class ConsultaSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    medico = MedicoSerializer(read_only=True)

    class Meta:
        model = Consulta
        fields = '__all__'


class InasistenciaSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    consulta = ConsultaSerializer(read_only=True)

    class Meta:
        model = Inasistencia
        fields = '__all__'
