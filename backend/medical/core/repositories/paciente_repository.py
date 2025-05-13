from core.models import Paciente
from django.core.exceptions import ObjectDoesNotExist

class PacienteRepository:
    def get_all(self):
        """Obtiene todos los pacientes"""
        return Paciente.objects.all()

    def get_by_id(self, paciente_id):
        """Obtiene un paciente por ID"""
        try:
            return Paciente.objects.get(id=paciente_id)
        except ObjectDoesNotExist:
            return None  # Retorna None si el paciente no existe, evitando el error

    def create(self, data):
        """Crea un nuevo paciente"""
        return Paciente.objects.create(**data)

    def update(self, paciente_id, data):
        """Actualiza un paciente existente"""
        paciente = self.get_by_id(paciente_id)
        if paciente is None:
            return None  # Si el paciente no existe, no se actualiza
        for key, value in data.items():
            setattr(paciente, key, value)
        paciente.save()
        return paciente  # Retorna el paciente actualizado

    def delete(self, paciente_id):
        """Elimina un paciente"""
        paciente = self.get_by_id(paciente_id)
        if paciente is None:
            return None  # Si el paciente no existe, no se elimina
        try:
            paciente.delete()
            return True  # Retorna True si la eliminación fue exitosa
        except Exception as e:
            return str(e)  # Retorna el error si ocurre un fallo al eliminar
