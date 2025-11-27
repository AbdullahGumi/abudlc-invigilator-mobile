import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import useEventReports, { EventReport } from "../../hooks/useEventReports";

const EventReportsHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getReports } = useEventReports();

  const reports = getReports();

  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<EventReport | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleImagePress = useCallback(
    (report: EventReport, imageIndex: number) => {
      setSelectedReport(report);
      setSelectedImageIndex(imageIndex);
      setImageViewerVisible(true);
    },
    [],
  );

  const handleCloseImageViewer = useCallback(() => {
    setImageViewerVisible(false);
    setSelectedReport(null);
    setSelectedImageIndex(0);
  }, []);

  const handleImageScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const slideSize = Dimensions.get("window").width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setSelectedImageIndex(index);
    },
    [],
  );

  const renderReport = ({ item }: { item: EventReport }) => (
    <View style={styles.reportCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          <Text
            variant="titleMedium"
            style={styles.reportTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>
        </View>
        <Text variant="bodySmall" style={styles.reportTime}>
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>

      <Text variant="bodyMedium" style={styles.reportBody} numberOfLines={3}>
        {item.body}
      </Text>

      {item.media && item.media.length > 0 && (
        <View style={styles.mediaSection}>
          <View style={styles.mediaHeader}>
            <Ionicons name="images-outline" size={16} color="#666" />
            <Text variant="bodySmall" style={styles.mediaCount}>
              {item.media.length} image{item.media.length !== 1 ? "s" : ""}
            </Text>
          </View>
          <View style={styles.mediaContainer}>
            {item.media.slice(0, 4).map((media, index) => (
              <TouchableOpacity
                key={media.id}
                style={styles.mediaWrapper}
                onPress={() => handleImagePress(item, index)}
              >
                <Image
                  source={{ uri: media.thumbnailUri }}
                  style={styles.mediaThumbnail}
                  resizeMode="cover"
                />
                {index === 3 && item.media!.length > 4 && (
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>
                      +{item.media!.length - 4}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={20} color="#666" />
        </TouchableOpacity>
        <Text variant="headlineSmall" style={styles.mainTitle}>
          Report History
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderReport}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No Reports Yet</Text>
            <Text style={styles.emptySubtitle}>
              Submitted reports will appear here
            </Text>
          </View>
        }
      />

      {/* Image Viewer Modal */}
      <Modal
        visible={imageViewerVisible}
        animationType="fade"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseImageViewer}
      >
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={styles.imageViewerContainer}>
          <View style={styles.imageViewerHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseImageViewer}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            {selectedReport?.media && (
              <Text style={styles.imageCounter}>
                {selectedImageIndex + 1} / {selectedReport.media.length}
              </Text>
            )}
            <View style={styles.headerSpacer} />
          </View>

          {selectedReport?.media && (
            <FlatList
              data={selectedReport.media}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={selectedImageIndex}
              onScroll={handleImageScroll}
              getItemLayout={(data, index) => ({
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              })}
              renderItem={({ item }) => (
                <View style={styles.fullImageContainer}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.fullImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  mainTitle: {
    textAlign: "center",
    color: "#000",
  },
  headerSpacer: {
    width: 40,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  reportCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginRight: 12,
  },
  titleIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  reportTitle: {
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
    lineHeight: 22,
  },
  reportTime: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
  },
  reportBody: {
    color: "#4a4a4a",
    lineHeight: 20,
    marginBottom: 16,
  },
  mediaSection: {
    marginTop: 8,
  },
  mediaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  mediaCount: {
    color: "#666",
    marginLeft: 4,
    fontSize: 12,
  },
  mediaContainer: {
    flexDirection: "row",
    gap: 8,
  },
  mediaWrapper: {
    position: "relative",
  },
  mediaThumbnail: {
    width: 60,
    height: 60,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  // Image Viewer Modal Styles
  imageViewerContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageViewerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  imageCounter: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  fullImageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 120,
  },
});

export default EventReportsHistoryScreen;
