import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTelemetry, fetchDevices, updateDevice } from '../api/deviceApi';
import { Card, CardHeader, CardBody, Button, Input, Select, Label, Table, TableRow, TableCell, Badge } from '../components/TailwindComponents';

function DeviceDetailPage() {
  const { deviceid } = useParams();
  const [device, setDevice] = useState(null);
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const i = setInterval(loadData, 5000);
    return () => clearInterval(i);
  }, [deviceid]);

  const loadData = async () => {
    try {
      const all = await fetchDevices();
      setDevice(all.find(d => d.device_id === deviceid));
      setTelemetry(await fetchTelemetry(deviceid));
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      const updated = await updateDevice(deviceid, Object.fromEntries(fd));
      setDevice(updated);
      alert('Threshold Saved');
    // eslint-disable-next-line no-unused-vars
    } catch (e) { alert('Error'); }
  };

  if (loading || !device) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  const isCritical = telemetry.length > 0 && telemetry[0].alert_triggered;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Fleet</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{device.name}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{device.name}</h1>
          <p className="text-gray-500 text-sm mt-1 font-mono">ID: {deviceid}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${isCritical ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
          <div className={`w-2 h-2 rounded-full ${isCritical ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="font-bold text-sm uppercase tracking-wide">{isCritical ? 'Critical Alert' : 'System Nominal'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader title="Configuration" />
            <CardBody>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label>Metric</Label>
                  <Input value={device.metric_type} disabled className="bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <Label>Threshold Rule</Label>
                  <div className="flex gap-2">
                    <Select name="threshold_operator" defaultValue={device.threshold_operator} className="w-20">
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="=">=</option>
                    </Select>
                    <Input type="number" name="threshold_value" defaultValue={device.threshold_value} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Triggers when value {device.threshold_operator} {device.threshold_value}
                  </p>
                </div>
                <Button type="submit" variant="secondary" className="w-full">Update Settings</Button>
              </form>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader title="Recent Telemetry" action={<Badge type="neutral" text={`${telemetry.length} Events`} />} />
            <Table headers={['Timestamp', 'Reading', 'Status']}>
              {telemetry.map((t, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {new Date(t.timestamp).toLocaleTimeString()}
                    <span className="text-gray-400 text-xs ml-2">{new Date(t.timestamp).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono font-medium text-gray-900">{t.value}</span>
                  </TableCell>
                  <TableCell>
                    {t.alert_triggered ? <Badge type="danger" text="Critical" /> : <Badge type="success" text="Normal" />}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetailPage;