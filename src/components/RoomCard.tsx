import { ArrowRight, LeftSharpArrow } from "@src/assets/icons";
import { Pressable, Text, View } from "react-native"

interface IRoomCard {
    roomName: string;
    handlePress: () => void

}
const RoomCard = (props: IRoomCard) => {
    const { roomName, handlePress } = props
    return (
        <Pressable onPress={handlePress} style={{
            flexDirection: "row",
            marginBottom: 1,
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 16,
            justifyContent: "space-between"
        }}>
            <View style={{ gap: 8, flexDirection: "row", alignItems: "center", }}>

                <View style={{ width: 40, height: 40, backgroundColor: '#EAEFFA', borderRadius: 20 }} />

                <Text style={{ textTransform: "capitalize" }}>
                    {roomName || ""}
                </Text>
            </View>
            <LeftSharpArrow />
        </Pressable>
    )

}
export default RoomCard