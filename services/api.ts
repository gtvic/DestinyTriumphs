import axios from 'axios'
import { useRuntimeConfig } from '#app'

// Crée une fonction qui retourne une instance Axios
export const api = () => {
    const config = useRuntimeConfig()
    // Debug: Check if the API key is loaded correctly
    console.log('Bungie API Key:', config.public.bungieApiKey)
    
    return axios.create({
        baseURL: 'https://www.bungie.net/Platform',
        headers: {
            'X-API-Key': config.public.bungieApiKey as string // Assure-toi que la clé API est typée en string
        }
    })
}
export const getTriumphs = async (membershipType: number, destinyMembershipId: string) => {
    try {
        const response = await api().get(`/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=Records`,)
        
        const records = response.data.Response.profileRecords.data.records
        const triumphData: any[] = []
        
        // Extraire le hash et le statut de complétion
        Object.keys(records).forEach(hash => {
            const record = records[hash];
            
            // Vérifie si objectives existe et est un tableau
            const objectives = record.objectives || []; // Utilise un tableau vide si objectives est undefined
            
            // Crée un tableau pour les statuts de chaque objectif
            const objectiveStatus = objectives.map((objective: any) => ({
                complete: objective.complete, // Statut de complétion de l'objectif
                progress: objective.progress, // Progrès de l'objectif
                completionValue: objective.completionValue // Valeur d'achèvement de l'objectif
            }));
            
            var isComplete = false
            if(!objectives){
                isComplete = objectiveStatus.every((obj: any) => obj.complete);
            }
            
            triumphData.push({
                hash, // Hash du record
                complete: isComplete, // Statut de complétion
                objectives: objectiveStatus // Statuts de tous les objectifs
            });
        });
        
        return triumphData
    } catch (error) {
        console.error('Error fetching triumphs:', error)
        throw error
    }
}