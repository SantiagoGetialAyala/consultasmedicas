from core.models import Especialidad
from django.core.exceptions import ObjectDoesNotExist

class EspecialidadRepository:
    def get_all(self):
        """Obtiene todas las especialidades"""
        return Especialidad.objects.all()

    def get_by_id(self, especialidad_id):
        """Obtiene una especialidad por ID"""
        try:
            return Especialidad.objects.get(id=especialidad_id)
        except ObjectDoesNotExist:
            return None  # Si no encuentra la especialidad, devuelve None

    def create(self, data):
        """Crea una nueva especialidad"""
        return Especialidad.objects.create(**data)

    def update(self, especialidad_id, data):
        """Actualiza una especialidad existente"""
        especialidad = self.get_by_id(especialidad_id)
        if especialidad is None:
            raise ObjectDoesNotExist(f"Especialidad con ID {especialidad_id} no encontrada.")
        for key, value in data.items():
            setattr(especialidad, key, value)
        especialidad.save()

    def delete(self, especialidad_id):
        """Elimina una especialidad"""
        especialidad = self.get_by_id(especialidad_id)
        if especialidad is None:
            raise ObjectDoesNotExist(f"Especialidad con ID {especialidad_id} no encontrada.")
        especialidad.delete()
        return True  # Devuelve True si se eliminó correctamente
