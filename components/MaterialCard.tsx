// components/MaterialCard.tsx
import { View, Text, StyleSheet } from "react-native";
import { Material } from "../types";

// Each category gets its own color — makes scanning the list fast
const CATEGORY_COLORS: Record<string, string> = {
  Concrete: "#b45309",
  Steel:    "#6366f1",
  Wood:     "#15803d",
  Electrical: "#ca8a04",
  Plumbing: "#0369a1",
  Safety:   "#dc2626",
};

interface Props {
  material: Material;
}

export default function MaterialCard({ material }: Props) {
  const isLowStock = material.quantity <= material.minStock;
  const categoryColor = CATEGORY_COLORS[material.category] ?? "#7a7d85";

  return (
    <View style={styles.card}>

      {/* Top row: name + low stock badge */}
      <View style={styles.topRow}>
        <Text style={styles.name}>{material.name}</Text>
        {isLowStock && (
          <View style={styles.lowStockBadge}>
            <Text style={styles.lowStockText}>LOW</Text>
          </View>
        )}
      </View>

      {/* Category pill */}
      <View style={[styles.categoryPill, { backgroundColor: categoryColor + "33" }]}>
        <Text style={[styles.categoryText, { color: categoryColor }]}>
          {material.category}
        </Text>
      </View>

      {/* Bottom row: quantity */}
      <Text style={[styles.quantity, isLowStock && styles.quantityLow]}>
        {material.quantity} {material.unit} in stock
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1d21",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2a2d32",
    gap: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#f1f0ee",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  lowStockBadge: {
    backgroundColor: "#dc262633",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lowStockText: {
    color: "#dc2626",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  categoryPill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
  },
  quantity: {
    color: "#7a7d85",
    fontSize: 13,
  },
  quantityLow: {
    color: "#dc2626",
  },
});