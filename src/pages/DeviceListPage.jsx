/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { fetchDevices, createDevice } from '../api/deviceApi';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, Input, Select, Label, Table, TableRow, TableCell, Badge } from '../components/TailwindComponents';

function DeviceListPage() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', metric_type: 'temperature', threshold_value: 0, threshold_operator: '>' });
  const navigate = useNavigate();

  useEffect(() => { loadDevices(); }, []);

  const loadDevices = async () => {
    try { setDevices(await fetchDevices()); } 
    catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createDevice(newDevice);
      await loadDevices(); // Refresh list
      setShowAddForm(false);
      setNewDevice({ name: '', metric_type: 'temperature', threshold_value: 0, threshold_operator: '>' });
    } catch (e) { alert('Failed to create'); }
  };

  const handleInput = (e) => setNewDevice({ ...newDevice, [e.target.name]: e.target.value });

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Fleet</h1>
          <p className="text-sm text-gray-500">Manage connected sensors and thresholds</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add Device'}
        </Button>
      </div>

      {showAddForm && (
        <Card className="animate-fade-in-down mb-6 border-blue-200 ring-4 ring-blue-50/50">
          <CardHeader title="Register New Device" />
          <CardBody>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="md:col-span-1">
                <Label>Name</Label>
                <Input name="name" placeholder="e.g. Sensor A" value={newDevice.name} onChange={handleInput} required />
              </div>
              <div className="md:col-span-1">
                <Label>Metric</Label>
                <Select name="metric_type" value={newDevice.metric_type} onChange={handleInput}>
                  <option value="temperature">Temperature</option>
                  <option value="current">Current</option>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Label>Alert Rule</Label>
                <div className="flex gap-2">
                  <Select name="threshold_operator" value={newDevice.threshold_operator} onChange={handleInput} className="w-1/3">
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                  </Select>
                  <Input type="number" name="threshold_value" value={newDevice.threshold_value} onChange={handleInput} required className="w-2/3" />
                </div>
              </div>
              <Button type="submit" variant="primary">Create Device</Button>
            </form>
          </CardBody>
        </Card>
      )}

      <Card>
        <Table headers={['Device Name', 'Type', 'Alert Rule', 'Status', '']}>
          {devices.map((device) => (
            <TableRow key={device.device_id} onClick={() => navigate(`/devices/${device.device_id}`)}>
              <TableCell className="font-medium text-gray-900">{device.name}</TableCell>
              <TableCell>
                <span className="capitalize">{device.metric_type}</span>
              </TableCell>
              <TableCell>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">
                  {device.metric_type} {device.threshold_operator} {device.threshold_value}
                </code>
              </TableCell>
              <TableCell>
                {device.total_alerts > 0 ? (
                  <Badge type="danger" text={`${device.total_alerts} Alerts`} />
                ) : (
                  <Badge type="success" text="Healthy" />
                )}
              </TableCell>
              <TableCell className="text-right text-gray-400">
                &rarr;
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}

export default DeviceListPage;