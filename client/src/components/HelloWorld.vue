<template>
  <v-container class="fill-height">
    <v-responsive class="text-center fill-height">
      <v-row class="d-flex align-center">
        <v-col cols="3">
          <v-select v-model="location" title="location" :items="locationList" item-title="name" item-value="id" />
        </v-col>
        <v-col cols="3">
          <v-text-field label="group size" v-model="groupSize" />
        </v-col>
        <v-col cols="3">
          <VueDatePicker v-model="date" range :enable-time-picker="false" model-type="MM/dd/yyyy"></VueDatePicker>
        </v-col>

        <v-col cols="3">
          <v-btn @click="search" variant="text">
            <v-icon icon="mdi-magnify" size="large" start />
            Search
          </v-btn>
        </v-col>
        <v-row v-for="hotel in allHotels" class="justify-center">
          <v-col cols="8">
            <v-card width="800" class="d-flex">
              <v-col cols="4">
                <v-img :src="hotel.HotelDescriptiveContent.Images[0].URL"></v-img>
              </v-col>
              <v-col cols="auto" class="flex-start">
                <v-card-title>{{ hotel.HotelName }}</v-card-title>
                <v-card-subtitle>
                  <v-rating :model-value="hotel.HotelInfo.Rating" disabled size="x-small" />
                </v-card-subtitle>
                <v-card-actions>
                  Price: <b>
                    {{ hotel.PricesInfo.AmountAfterTax }}
                  </b>
                </v-card-actions>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { searchHotels, getSearchResultsInterval } from "@/controllers/hotels";
import { locationSearchOptions } from "@/entities/hotels";
import { searchResults } from "@/entities/hotels";
const location = ref("");
const locationList = computed(() =>
  locationSearchOptions
)
const allHotels = computed(() => {
  const sortedValue = searchResults.value.sort((a, b) => b.PricesInfo.AmountAfterTax - a.PricesInfo.AmountAfterTax)
  return sortedValue
})

const groupSize = ref(0);
const date = ref("")
const startDate = computed(() => date.value[0])
const endDate = computed(() => date.value[1])

const search = async () => {
  console.log("searching hotels");
  const isSearchSucceeded = await searchHotels({
    location: location.value,
    groupSize: groupSize.value,
    toDate: startDate.value,
    fromDate: endDate.value
  })
  if (isSearchSucceeded) {
    getSearchResultsInterval()
  }
};
</script>
