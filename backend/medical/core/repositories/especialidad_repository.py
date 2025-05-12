from core.models import Especialidad

class EspecialidadRepository:
    def get_all(self):
        """Obtiene todas las especialidades"""
        return Especialidad.objects.all()

    def get_by_id(self, especialidad_id):
        """Obtiene una especialidad por ID"""
        return Especialidad.objects.get(id=especialidad_id)

    def create(self, data):
        """Crea una nueva especialidad"""
        return Especialidad.objects.create(**data)

    def update(self, especialidad_id, data):
        """Actualiza una especialidad existente"""
        especialidad = self.get_by_id(especialidad_id)
        for key, value in data.items():
            setattr(especialidad, key, value)
        especialidad.save()

    def delete(self, especialidad_id):
        """Elimina una especialidad"""
        especialidad = self.get_by_id(especialidad_id)
        especialidad.delete()
