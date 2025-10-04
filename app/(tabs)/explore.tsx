// ...existing code...

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { insertMaterial } from '@/utils/db';
import { useState } from 'react';
import { Button, StyleSheet, Switch, TextInput, View } from 'react-native';

export default function ExploreScreen() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    subcategoria: '',
    reciclable: '1',
    tipo_reciclaje: '',
    grado_contaminacion: '',
    color: '',
    peso_unitario: '',
    unidades: '',
    volumen_unitario: '',
    ubicacion: '',
    estado: '',
    codigo_identificacion: '',
    imagen_url: '',
    probabilidad_clasificacion_ia: '',
    fecha_ingreso: '',
    fecha_salida: '',
    proveedor_origen: '',
    destino: '',
    notas: '',
    vida_util_estimada: '',
    condiciones_almacenamiento: '',
    uso_actual: '',
    usos_potenciales: '',
    compatibilidad_reciclaje: '',
    energia_necesaria_reciclaje: '',
    agua_necesaria_reciclaje: '',
    costo_estimado_reciclaje: '',
    impacto_ambiental: '',
    composicion: '',
    origen_material: '',
    prioridad_reuso: '0',
    responsable_asignado: '',
    lote: '',
    tipo_material_id: '',
  });

  // ...existing code...

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAgregar = async () => {
    if (!form.nombre) return;
    const toInsert: any = { ...form };
    toInsert.reciclable = parseInt(form.reciclable) || 0;
    toInsert.peso_unitario = form.peso_unitario ? parseFloat(form.peso_unitario) : null;
    toInsert.unidades = form.unidades ? parseInt(form.unidades) : null;
    toInsert.volumen_unitario = form.volumen_unitario ? parseFloat(form.volumen_unitario) : null;
    toInsert.probabilidad_clasificacion_ia = form.probabilidad_clasificacion_ia ? parseFloat(form.probabilidad_clasificacion_ia) : null;
    toInsert.energia_necesaria_reciclaje = form.energia_necesaria_reciclaje ? parseFloat(form.energia_necesaria_reciclaje) : null;
    toInsert.agua_necesaria_reciclaje = form.agua_necesaria_reciclaje ? parseFloat(form.agua_necesaria_reciclaje) : null;
    toInsert.costo_estimado_reciclaje = form.costo_estimado_reciclaje ? parseFloat(form.costo_estimado_reciclaje) : null;
    toInsert.prioridad_reuso = form.prioridad_reuso ? parseInt(form.prioridad_reuso) : 0;
    toInsert.tipo_material_id = form.tipo_material_id ? parseInt(form.tipo_material_id) : null;

    await insertMaterial(toInsert);
    setForm({
      nombre: '', descripcion: '', categoria: '', subcategoria: '', reciclable: '1', tipo_reciclaje: '', grado_contaminacion: '', color: '', peso_unitario: '', unidades: '', volumen_unitario: '', ubicacion: '', estado: '', codigo_identificacion: '', imagen_url: '', probabilidad_clasificacion_ia: '', fecha_ingreso: '', fecha_salida: '', proveedor_origen: '', destino: '', notas: '', vida_util_estimada: '', condiciones_almacenamiento: '', uso_actual: '', usos_potenciales: '', compatibilidad_reciclaje: '', energia_necesaria_reciclaje: '', agua_necesaria_reciclaje: '', costo_estimado_reciclaje: '', impacto_ambiental: '', composicion: '', origen_material: '', prioridad_reuso: '0', responsable_asignado: '', lote: '', tipo_material_id: '',
    });
    // Podrías mostrar un mensaje de éxito aquí
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<View />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Agregar material</ThemedText>
      </ThemedView>
      <ThemedView>
        <TextInput placeholder="Nombre*" value={form.nombre} onChangeText={v => handleChange('nombre', v)} style={inputStylePrincipal}
          placeholderTextColor={placeHolderStyle} />
        <TextInput placeholder="Categoría*" value={form.categoria} onChangeText={v => handleChange('categoria', v)} style={inputStylePrincipal}
          placeholderTextColor={placeHolderStyle} />
        <TextInput placeholder="Descripción*" value={form.descripcion} onChangeText={v => handleChange('descripcion', v)} style={inputStylePrincipal}
          placeholderTextColor={placeHolderStyle} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Switch
            value={form.reciclable === '1'}
            onValueChange={v => handleChange('reciclable', v ? '1' : '0')}
            trackColor={{ false: '#ccc', true: '#0077cc' }}
            thumbColor={form.reciclable === '1' ? '#0077cc' : '#f4f3f4'}
          />
          <ThemedText style={{ marginLeft: 8, fontWeight: 'bold' }}>Reciclable*</ThemedText>
        </View>
        <TextInput placeholder="Código QR*" value={form.codigo_identificacion} onChangeText={v => handleChange('codigo_identificacion', v)} style={inputStylePrincipal} placeholderTextColor={placeHolderStyle} />

        {/* Resto de campos */}
        <TextInput placeholder="Subcategoría" value={form.subcategoria} onChangeText={v => handleChange('subcategoria', v)} style={inputStyle} />
        <TextInput placeholder="Tipo reciclaje" value={form.tipo_reciclaje} onChangeText={v => handleChange('tipo_reciclaje', v)} style={inputStyle} />
        <TextInput placeholder="Grado contaminación" value={form.grado_contaminacion} onChangeText={v => handleChange('grado_contaminacion', v)} style={inputStyle} />
        <TextInput placeholder="Color" value={form.color} onChangeText={v => handleChange('color', v)} style={inputStyle} />
        <TextInput placeholder="Peso unitario (kg)" value={form.peso_unitario} onChangeText={v => handleChange('peso_unitario', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Unidades" value={form.unidades} onChangeText={v => handleChange('unidades', v)} style={inputStyle} keyboardType="numeric" />
        <TextInput placeholder="Volumen unitario (m³)" value={form.volumen_unitario} onChangeText={v => handleChange('volumen_unitario', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Ubicación" value={form.ubicacion} onChangeText={v => handleChange('ubicacion', v)} style={inputStyle} />
        <TextInput placeholder="Estado" value={form.estado} onChangeText={v => handleChange('estado', v)} style={inputStyle} />
        <TextInput placeholder="Imagen URL" value={form.imagen_url} onChangeText={v => handleChange('imagen_url', v)} style={inputStyle} />
        <TextInput placeholder="Probabilidad clasificación IA (%)" value={form.probabilidad_clasificacion_ia} onChangeText={v => handleChange('probabilidad_clasificacion_ia', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Fecha ingreso" value={form.fecha_ingreso} onChangeText={v => handleChange('fecha_ingreso', v)} style={inputStyle} />
        <TextInput placeholder="Fecha salida" value={form.fecha_salida} onChangeText={v => handleChange('fecha_salida', v)} style={inputStyle} />
        <TextInput placeholder="Proveedor/Origen" value={form.proveedor_origen} onChangeText={v => handleChange('proveedor_origen', v)} style={inputStyle} />
        <TextInput placeholder="Destino" value={form.destino} onChangeText={v => handleChange('destino', v)} style={inputStyle} />
        <TextInput placeholder="Notas" value={form.notas} onChangeText={v => handleChange('notas', v)} style={inputStyle} />
        <TextInput placeholder="Vida útil estimada" value={form.vida_util_estimada} onChangeText={v => handleChange('vida_util_estimada', v)} style={inputStyle} />
        <TextInput placeholder="Condiciones almacenamiento" value={form.condiciones_almacenamiento} onChangeText={v => handleChange('condiciones_almacenamiento', v)} style={inputStyle} />
        <TextInput placeholder="Uso actual" value={form.uso_actual} onChangeText={v => handleChange('uso_actual', v)} style={inputStyle} />
        <TextInput placeholder="Usos potenciales" value={form.usos_potenciales} onChangeText={v => handleChange('usos_potenciales', v)} style={inputStyle} />
        <TextInput placeholder="Compatibilidad reciclaje" value={form.compatibilidad_reciclaje} onChangeText={v => handleChange('compatibilidad_reciclaje', v)} style={inputStyle} />
        <TextInput placeholder="Energía necesaria reciclaje (kWh)" value={form.energia_necesaria_reciclaje} onChangeText={v => handleChange('energia_necesaria_reciclaje', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Agua necesaria reciclaje (L)" value={form.agua_necesaria_reciclaje} onChangeText={v => handleChange('agua_necesaria_reciclaje', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Costo estimado reciclaje (USD)" value={form.costo_estimado_reciclaje} onChangeText={v => handleChange('costo_estimado_reciclaje', v)} style={inputStyle} keyboardType="decimal-pad" />
        <TextInput placeholder="Impacto ambiental" value={form.impacto_ambiental} onChangeText={v => handleChange('impacto_ambiental', v)} style={inputStyle} />
        <TextInput placeholder="Composición" value={form.composicion} onChangeText={v => handleChange('composicion', v)} style={inputStyle} />
        <TextInput placeholder="Origen material" value={form.origen_material} onChangeText={v => handleChange('origen_material', v)} style={inputStyle} />
        <TextInput placeholder="Prioridad reuso (0-2)" value={form.prioridad_reuso} onChangeText={v => handleChange('prioridad_reuso', v)} style={inputStyle} keyboardType="numeric" />
        <TextInput placeholder="Responsable asignado" value={form.responsable_asignado} onChangeText={v => handleChange('responsable_asignado', v)} style={inputStyle} />
        <TextInput placeholder="Lote" value={form.lote} onChangeText={v => handleChange('lote', v)} style={inputStyle} />
        <TextInput placeholder="Tipo material ID" value={form.tipo_material_id} onChangeText={v => handleChange('tipo_material_id', v)} style={inputStyle} keyboardType="numeric" />
      </ThemedView>
      <Button title="Agregar material" onPress={handleAgregar} />
    </ParallaxScrollView>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  color: '#cfd8dbff',
  padding: 8,
  marginBottom: 8,
  borderRadius: 6,
};

const inputStylePrincipal = {
  ...inputStyle,
  color: '#2a3236ff',
  backgroundColor: '#eaf4ff',
  fontWeight: 'bold' as "bold",
};

const placeHolderStyle = '#5b5b5baa';

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  principalesContainer: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#0077cc',
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
});
