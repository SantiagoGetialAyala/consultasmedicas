from core.models import Inasistencia, Paciente, Consulta

class InasistenciaRepository:
    def get_all(self):
        """Obtiene todas las inasistencias"""
        return Inasistencia.objects.all()

    def get_by_id(self, inasistencia_id):
        """Obtiene una inasistencia por ID"""
        return Inasistencia.objects.get(id=inasistencia_id)

    def create(self, data):
        """Crea una nueva inasistencia"""
        paciente = Paciente.objects.get(id=data['paciente'])
        consulta = Consulta.objects.get(id=data['consulta'])

        return Inasistencia.objects.create(
            paciente=paciente,
            consulta=consulta,
            motivo=data.get('motivo', ''),
            fecha=data['fecha']
        )

    def update(self, inasistencia_id, data):
        """Actualiza una inasistencia existente"""
        inasistencia = self.get_by_id(inasistencia_id)

        if 'paciente' in data:
            inasistencia.paciente = Paciente.objects.get(id=data['paciente'])
        if 'consulta' in data:
            inasistencia.consulta = Consulta.objects.get(id=data['consulta'])
        if 'motivo' in data:
            inasistencia.motivo = data['motivo']
        if 'fecha' in data:
            inasistencia.fecha = data['fecha']

        inasistencia.save()
        return inasistencia

    def delete(self, inasistencia_id):
        """Elimina una inasistencia"""
        inasistencia = self.get_by_id(inasistencia_id)
        inasistencia.delete()
