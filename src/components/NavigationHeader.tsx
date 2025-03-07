import { useNavigation } from "@react-navigation/native";
import { ArrowRight } from "@src/assets/icons"
import { ReactElement } from "react";
import { Pressable, Text, View } from "react-native"

interface IHeader {
    title: string;
    isBackNavigation: boolean;
    rightElement?: ReactElement
}
const NavigationHeader = (props: IHeader) => {
    const { title, isBackNavigation, rightElement } = props
    const navigation = useNavigation()
    const handleButtonPress=()=>{
        navigation.goBack()
    }
    return (
        <View style={{ height: 54, backgroundColor: '#fff', justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderColor: "#EAEFFA" }}>
            {
                isBackNavigation &&
                <Pressable style={{ position: "absolute", left: 16 }} onPress={handleButtonPress}>
                    <ArrowRight />
                </Pressable>

            }
            <Text style={{ color: "#000" }}>{title}</Text>
            <View style={{ position: "absolute", right: 16 }}>
                {rightElement}
            </View>
        </View>
    )
}
export default NavigationHeader