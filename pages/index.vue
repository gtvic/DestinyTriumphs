<template>
    <div>
      <h1>Destiny 2 Triumphs</h1>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div v-if="triumphs.length">
          <div v-for="(record, index) in triumphs" :key="index" class="triumph">
            <h2>Record Hash: {{ record.hash }}</h2>
            <p>Status: {{ record.complete ? 'Complete' : 'Incomplete' }}</p>
            <div v-if="record.complete">
                  <input type="checkbox" name="complete" checked disabled>
                </div>
                <div v-else>
                  <input type="checkbox" name="not_complete" disabled>
                </div>
            <p v-for="(objective, index) in record.objectives" :key="index">
                {{ 
                    objective.progress > objective.completionValue ?
                        `Objective ${index + 1}: Complete: ${objective.complete} ${objective.completionValue}/${objective.completionValue}` :
                        `Objective ${index + 1}: Complete: ${objective.complete} ${objective.progress}/${objective.completionValue}`
                }}
                <div v-if="objective.complete">
                  <input type="checkbox" name="complete" checked disabled>
                </div>
                <div v-else>
                  <input type="checkbox" name="not_complete" disabled>
                </div>
            </p> 
          </div>
        </div>
        <div v-else>
          <p>No triumphs found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { getTriumphs } from '../services/api' // Chemin relatif vers ton fichier api.ts
  
  const triumphs = ref<any[]>([])
  const loading = ref(true)
  
  const fetchTriumphs = async () => {
    loading.value = true
    const membershipType = 3 // Remplace par le type de membership approprié
    const destinyMembershipId = '4611686018492529529' // Remplace par l'ID du joueur
  
    try {
      triumphs.value = await getTriumphs(membershipType, destinyMembershipId)
    } catch (error) {
      console.error('Error fetching triumphs:', error)
    } finally {
      loading.value = false
    }
  }
  
  
  onMounted(() => {
    fetchTriumphs()
  })
  </script>
  
  <style scoped>
  .triumph {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  </style>