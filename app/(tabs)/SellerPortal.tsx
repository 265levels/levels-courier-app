import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { globalStyles } from './_styles'; 

export default function SellerPortal({ product, onBack }: { product: any, onBack: () => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  if (!product) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ef4444" />
        <Text style={{ color: '#71717a', marginTop: 10 }}>Fetching product data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      {/* Header */}
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>← NEW SEARCH</Text>
        </TouchableOpacity>
        <Text style={globalStyles.logo}>LEVELS®</Text>
      </View>

      {/* Main Logistics Card */}
      <View style={[globalStyles.card, { padding: 0, overflow: 'hidden', borderColor: '#ef4444', borderWidth: 1 }]}>
        
        {/* Route Ribbon: From -> To */}
        <View style={{ backgroundColor: '#ef4444', padding: 12, alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '900', letterSpacing: 1, fontSize: 14 }}>
            {product.sellerLocation?.toUpperCase() || "ORIGIN"} ➔ {product.preferredBuyerLocation?.toUpperCase() || "MALAWI"}
          </Text>
        </View>

        {/* Product Image */}
        <View style={globalStyles.slideshowContainer}>
          <Image 
            source={{ uri: product.images?.[imgIndex] || 'https://via.placeholder.com/400' }} 
            style={[globalStyles.image, { height: 250 }]} 
          />
          {product.images?.length > 1 && (
            <TouchableOpacity 
              onPress={() => setImgIndex((prev: number) => (prev + 1) % product.images.length)}
              style={globalStyles.nextBadge}
            >
              <Text style={globalStyles.badgeText}>NEXT IMAGE</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ padding: 20 }}>
          {/* Top Row: Transit Code & Status */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <View>
              <Text style={{ color: '#71717a', fontSize: 10, fontWeight: 'bold' }}>TRANSIT CODE</Text>
              <Text style={{ color: '#ef4444', fontSize: 20, fontWeight: '900' }}>{product.transitCode || 'N/A'}</Text>
            </View>
            <View style={{ backgroundColor: product.status === 'approved' ? '#22c55e' : '#eab308', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{product.status?.toUpperCase()}</Text>
            </View>
          </View>

          {/* Product Details */}
          <Text style={{ color: '#71717a', fontSize: 10, fontWeight: 'bold' }}>ITEM</Text>
          <Text style={[globalStyles.titleText, { fontSize: 18, marginBottom: 10 }]}>{product.title}</Text>

          <View style={{ height: 1, backgroundColor: '#333', marginVertical: 15 }} />

          {/* Logistics Data */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: '#71717a', fontSize: 10, fontWeight: 'bold' }}>SELLER</Text>
              <Text style={{ color: '#fff', fontSize: 14 }}>{product.sellerName || "Anonymous"}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#71717a', fontSize: 10, fontWeight: 'bold' }}>PRICE</Text>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>MWK {Number(product.price || 0).toLocaleString()}</Text>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[globalStyles.confirmButton, { marginTop: 25, backgroundColor: '#ef4444' }]}
            onPress={() => alert(`Package ${product.transitCode} Verified`)}
          >
            <Text style={globalStyles.buttonText}>VERIFY FOR PICKUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}