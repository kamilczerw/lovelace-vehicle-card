type VehicleElement = {
  name: string,
  sensor: string,
  image: string,
}

const SENSORS: VehicleElement[] = [
  { name: 'hood', sensor: 'binary_sensor.${sensorPrefix}_hood_closed', image: '' },
];
