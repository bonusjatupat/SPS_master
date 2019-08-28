import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    locationListItem: {
        width: '100%',
        height: 70,
        flex: 0,
        flexDirection: 'row',
        marginBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#F6F6F6'
    },
    locationListItem__distance: {
        width: 70,
        height: 50,
        paddingRight: 10,
        borderRightColor: '#EEEEEE',
        borderRightWidth: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'column'
    },
    locationListItem__distance_text: {
        fontWeight: 'bold',
        marginTop: 3,
        textAlign: 'center',
        color: '#4E4E4E',
        fontSize: 12
    },
    locationListItem__details: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    locationListItem__details_name: {
        width: '100%',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 15
    },
    locationListItem__details_address: {
        width: '100%',
        color: '#CBCBCB',
        fontSize: 10
    },
    locationListItem__fav: {
        width: 50,
        height: 50
    },
    locationListItem__fav_button: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    parkingItem: {
        width: '100%',
        height: 175,
        borderRadius: 15,
        backgroundColor: '#FFFFFF'
    },
    parkingItem__thumb: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        overflow: 'hidden',
        height: 120
    },
    parkingItem__thumb_bg: {
        width: '100%',
        height: 120,
        position: 'absolute',
        zIndex: 1
    },
    parkingItem__thumb_gradient: {
        width: '100%',
        height: 120,
        position: 'absolute',
        zIndex: 2
    },
    parkingItem__thumb_details: {
        width: '100%',
        height: 120,
        position: 'absolute',
        padding: 10,
        zIndex: 3
    },
    parkingItem__thumb_details_top: {
        flex: 0,
        alignItems: 'flex-end'
    },
    parkingItem__thumb_details_bottom: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    parkingItem__thumb_details_title: {
        flex: 1,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF'
    },
    parkingItem__thumb_details_price: {
        flex: 0,
        fontSize: 14,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    parkingItem__thumb_details_price_sub: {
        fontSize: 10,
        backgroundColor: 'transparent'
    },
    parkingItem__percentage: {
        width: '100%',
        height: 3,
    },
    parkingItem__percentage_percent: {
        height: 3
    },
    parkingItem__bottom: {
        width: '100%',
        height: 52,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    parkingItem__meta: {
        flex: 1,
        flexDirection: 'row'
    },
    parkingItem__meta_text: {
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 3,
        color: '#4A4A4A'
    },
    parkingItem__actions: {
        flex: 0,
        flexDirection: 'row'
    },
    parkingItem__actions_details_button: {
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    parkingItem__actions_details_button_text: {
        color: '#9B9B9B',
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    parkingItem__actions_directions_button: {
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F6CF3E',
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    parkingItem__actions_directions_button_text: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },

    parkingListItem: {
        width: '100%',
        height: 85,
        backgroundColor: '#FFFFFF',
        shadowOffset:{  width: 0,  height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        flex: 0,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 0
    },
    parkingListItem__thumb: {

    },
    parkingListItem__thumb_image: {
        width: 65,
        height: 65
    },
    parkingListItem__thumb_available: {
        width: '100%',
        height: 15,
        position: 'absolute',
        bottom: 0,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3
    },
    parkingListItem__thumb_available_high: {
        backgroundColor: 'rgba(126, 211, 23, 0.9)',
    },
    parkingListItem__thumb_available_mid: {
        backgroundColor: 'rgba(245, 166, 35, 0.9)',
    },
    parkingListItem__thumb_available_low: {
        backgroundColor: 'rgba(208, 2, 27, 0.9)',
    },
    parkingListItem__thumb_available_text: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 10,
        color: '#FFFFFF'
    },
    parkingListItem__details: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10
    },
    parkingListItem__details_name: {
        flex: 1,
        fontSize: 14,
        color: '#4D4D4D',
        fontWeight: 'bold'
    },
    parkingListItem__details_meta: {
        flex: 0,
        flexDirection: 'row'
    },
    parkingListItem__details_meta_rating: {
        backgroundColor: '#F5A623',
        height: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        justifyContent: 'center',
        marginRight: 5
    }, 
    parkingListItem__details_meta_rating_high: {
        backgroundColor: '#7ED321',
    },
    parkingListItem__details_meta_rating_mid: {
        backgroundColor: '#F5A623',
    },
    parkingListItem__details_meta_rating_low: {
        backgroundColor: '#D0021B',
    },
    parkingListItem__details_meta_distance: {
        backgroundColor: '#4A90E2',
        height: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        justifyContent: 'center',
        marginRight: 5
    },
    parkingListItem__details_meta_opened: {
        backgroundColor: '#94D157',
        height: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        justifyContent: 'center'
    },
    parkingListItem__details_meta_closed: {
        backgroundColor: '#D0021B',
        height: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        justifyContent: 'center'
    },
    parkingListItem__details_meta_text: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    parkingListItem__fact: {
        flex: 0,
        flexDirection: 'column'
    },
    parkingListItem__fact_rate: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#F5A623',
        textAlign: 'right'
    },
    parkingListItem__fact_walk: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#BABABA',
        textAlign: 'right'
    },
    parkingListItem__fact_bus: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#BABABA',
        textAlign: 'right'
    },
    facilityListItem: {
        height: 30,
        marginBottom: 10,
        alignItems: 'center',
        flex: 0,
        flexDirection: 'row'
    },
    facilityListItem__text: {
        color: '#787878',
        fontSize: 14,
        justifyContent: 'center',
        flex: 0,
        width: '100%'
    },
    facilityListItem__icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#787878',
        marginRight: 10,
        flex: 0
    },
    privCardList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    privCardListItem: {
        width: 330,
        height: 200,
        backgroundColor: '#F76B1C',
        shadowOffset: { width: 0,  height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        borderRadius: 5,
    },
    privCardListItem__card: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 0,
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 99
    },
    privCardListItem__card_wrapper: {
        flex: 1
    },
    privCardListItem__card_wrapper_blank: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    privCardListItem__card_newcard_icon: {
        backgroundColor: 'transparent',
        opacity: 0.6,
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 4
    },
    privCardListItem__card_newcard_text: {
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 4
    },
    privCardListItem__card_number: {
        flex: 0,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 4
    },
    privCardListItem__card_name: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 4
    },
    privCardListItem__card_expires: {
        flex: 0,
        fontWeight: 'bold',
        fontSize: 12,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        textShadowOffset: { width: 0, height: 2 },
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowRadius: 4
    },
    defaultCheckList: {
        flex: 0,
        flexDirection: 'row'
    },
    defaultCheckList__marker: {
        flex: 0,
        alignItems: 'flex-start'
    },
    defaultCheckList__label: {
        flex: 1,
        marginLeft: 20,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    defaultCheckList__label_text: {
        fontWeight: 'bold',
        fontSize: 20
    },
    defaultCheckList__label_mini: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    defaultCheckList__label_mini_text: {
        fontWeight: 'bold',
        fontSize: 14
    }
});