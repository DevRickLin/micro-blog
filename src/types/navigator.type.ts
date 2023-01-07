import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { IBlog } from "./blog.interface";
import { IExpress } from "./express.interface";


export type RootStackParamList = {
    Login: undefined;
    Normal: undefined;
}

export type TabParamsList = {
    Home: undefined;
    Scan: undefined;
    My: undefined;
} & RootStackParamList

export type ScanStackParamList = {
    Scanner: undefined;
    Result?: IExpress
} & TabParamsList

export type NormalStackParamList = {
    BlogList: undefined;
    Blog: IBlog;
    Input: { mode: 'blog' | 'comment', blogID?: number }
} & TabParamsList

export type NormalStackScreenProps<Screen extends keyof NormalStackParamList> = NativeStackScreenProps<NormalStackParamList,Screen>;
export type TabScreenProps = BottomTabScreenProps<TabParamsList>;
export type ScanStackScreenProps<Screen extends keyof ScanStackParamList> = NativeStackScreenProps<ScanStackParamList,Screen>;
export type RootStackScreenProps = NativeStackScreenProps<RootStackParamList>;