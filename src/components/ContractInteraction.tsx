import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEncryptedVoyageContract, useVoyageList } from '@/hooks/useContract';
import { useAccount } from 'wagmi';
import { Ship, Package, MapPin, Clock } from 'lucide-react';

export function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const { createVoyage, updateVoyageStatus, completeVoyage } = useEncryptedVoyageContract();
  const { data: voyages, isLoading } = useVoyageList();
  
  const [formData, setFormData] = useState({
    vesselName: '',
    cargoDescription: '',
    departurePort: '',
    arrivalPort: '',
    departureTime: '',
    arrivalTime: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateVoyage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) return;

    try {
      await createVoyage(
        formData.vesselName,
        formData.cargoDescription,
        parseInt(formData.departurePort),
        parseInt(formData.arrivalPort),
        new Date(formData.departureTime).getTime() / 1000,
        new Date(formData.arrivalTime).getTime() / 1000
      );
      
      // Reset form
      setFormData({
        vesselName: '',
        cargoDescription: '',
        departurePort: '',
        arrivalPort: '',
        departureTime: '',
        arrivalTime: '',
      });
    } catch (error) {
      console.error('Error creating voyage:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with the Encrypted Voyage contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please connect your wallet to create and manage voyages
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Create Voyage Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Create New Voyage
          </CardTitle>
          <CardDescription>
            Create a new encrypted voyage with FHE-protected data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateVoyage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vesselName">Vessel Name</Label>
                <Input
                  id="vesselName"
                  name="vesselName"
                  value={formData.vesselName}
                  onChange={handleInputChange}
                  placeholder="Enter vessel name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargoDescription">Cargo Description</Label>
                <Input
                  id="cargoDescription"
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the cargo"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departurePort">Departure Port ID</Label>
                <Input
                  id="departurePort"
                  name="departurePort"
                  type="number"
                  value={formData.departurePort}
                  onChange={handleInputChange}
                  placeholder="Port ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrivalPort">Arrival Port ID</Label>
                <Input
                  id="arrivalPort"
                  name="arrivalPort"
                  type="number"
                  value={formData.arrivalPort}
                  onChange={handleInputChange}
                  placeholder="Port ID"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  id="departureTime"
                  name="departureTime"
                  type="datetime-local"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrivalTime">Expected Arrival Time</Label>
                <Input
                  id="arrivalTime"
                  name="arrivalTime"
                  type="datetime-local"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Create Encrypted Voyage
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Voyage List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Active Voyages
          </CardTitle>
          <CardDescription>
            Manage your encrypted voyages and track their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading voyages...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {voyages?.map((voyage: any) => (
                <div key={voyage.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-primary" />
                      <span className="font-medium">{voyage.vesselName}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      voyage.status === 'In Transit' 
                        ? 'bg-blue-100 text-blue-800' 
                        : voyage.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {voyage.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{voyage.cargoDescription}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(voyage.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateVoyageStatus(voyage.id, 1)}
                    >
                      Update Status
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => completeVoyage(voyage.id)}
                    >
                      Complete Voyage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
