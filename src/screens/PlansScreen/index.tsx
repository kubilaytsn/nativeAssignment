import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setHideScreen} from '../../redux/actions/userActions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

function PlansScreen() {
  // const [storedValue, setStoredValue] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [active, setActive] = useState<string>('year');
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'UnLimited',
      icon: require('../../../assets/images/scan-icon.png'),
      desc: 'Plant Identify',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Faster',
      icon: require('../../../assets/images/speed-icon.png'),
      desc: 'Process',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Determined',
      icon: require('../../../assets/images/scan-icon.png'),
      desc: 'Plant Identify',
    },
  ];

  const handleSetPlans = () => {
    dispatch(setHideScreen(true));
    navigation.navigate('Home');
  };

  const renderItem = (tempData: any) => (
    <>
      <ScrollView horizontal={true}>
        <View style={styles.boxContainer}>
          <View style={styles.item}>
            <View style={styles.iconArea}>
              <Image
                source={tempData.item.icon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.flatListTitle}>{tempData.item.title}</Text>
            <Text style={styles.subtitle}>{tempData.item.desc}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
  return (
    <ImageBackground
      source={require('../../../assets/images/paywall.png')}
      style={styles.paywall}
      resizeMode="cover">
      <TouchableOpacity style={styles.closeButton} onPress={handleSetPlans}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.scrollViewGradient}
          source={require('../../../assets/images/transparentbg.png')}
        />
        <View style={styles.scrollViewContainer}>
          <View>
            <Text style={styles.titles}>
              PlantApp <Text style={styles.titlesSub}>Premium</Text>{' '}
            </Text>
            <Text style={styles.desc}>Access All Features</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item: any) => item.id}
              horizontal={true}
              style={styles.flatList}
            />
          </View>

          <TouchableOpacity
            style={
              active === 'year' ? styles.activePlansArea : styles.plansArea
            }
            onPress={() => {
              setActive('month');
            }}>
            <View style={styles.buttonInside}>
              <View style={styles.bgButton}>
                {active === 'month' && (
                  <Image
                    source={require('../../../assets/images/active.png')}
                    style={styles.bgButtonActive}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.plansDesc}>
                <View>
                  <Text style={styles.plansText}>1 Month</Text>
                </View>
                <View>
                  <Text style={styles.plansTextSub}>
                    $2.99/month, auto renewable
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              active === 'month' ? styles.activePlansArea : styles.plansArea
            }
            onPress={() => {
              setActive('year');
            }}>
            <View style={styles.buttonInside}>
              <View style={styles.bgButton}>
                {active === 'year' && (
                  <Image
                    source={require('../../../assets/images/active.png')}
                    style={styles.bgButtonActive}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.plansDiscount}>
                <Text style={styles.plansDiscountText}>Save 50%</Text>
              </View>
              <View style={styles.plansDesc}>
                <View>
                  <Text style={styles.plansText}>1 Year</Text>
                </View>
                <View>
                  <Text style={styles.plansTextSub}>
                    First 3 days free, then $529,99/year
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.continueButton}>
            <CustomButton
              title={'Try free for 3 days'}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              After the 3-day free trial period you’ll be charged ₺274.99 per
              year unless you
              <Text style={styles.footerText}>
                cancel before the trial expires. Yearly Subscription is
                Auto-Renewable
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  paywall: {
    height: '100%',
    display: 'flex',
    flex: 1,
    alignContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewGradient: {
    marginTop: 90,
    width: '100%',
  },
  scrollViewContainer: {
    backgroundColor: '#101E17',
  },
  closeButton: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 30,
    height: 30,
    borderRadius: 15,
    padding: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#ffff',
    fontWeight: '600',
  },
  titles: {
    marginTop: -70,
    marginBottom: 5,
    fontSize: 30,
    fontWeight: '800',
    color: '#ffff',
    paddingLeft: 20,
  },
  titlesSub: {
    fontSize: 27,
    fontWeight: '300',
  },
  flatList: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  desc: {
    marginBottom: 20,
    fontSize: 17,
    fontWeight: '300',
    color: '#ffffffb3',
    paddingLeft: 20,
  },
  item: {
    backgroundColor: '#FFFFFF14',
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 10,
    flexDirection: 'column',
    flex: 1,
    borderRadius: 14,
    color: '#ffff',
    minWidth: 156,
    width: '100%',
  },
  flatListTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffff',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFFFFFB2',
  },
  boxContainer: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
  },

  iconArea: {
    backgroundColor: 'rgba(0, 0, 0, 0.24);',
    marginBottom: 10,
    width: 36,
    height: 35,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    color: '#ffff',
  },
  plansArea: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#28AF6E',
    background: 'rgba(255, 255, 255, 0.05)',
    minHeight: 60,
    marginVertical: 10,
    marginHorizontal: 24,
    padding: 15,
  },
  activePlansArea: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    background: 'rgba(255, 255, 255, 0.05)',
    minHeight: 60,
    marginVertical: 10,
    marginHorizontal: 24,
    padding: 15,
  },
  buttonInside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  bgButton: {
    backgroundColor: '#FFFFFF14',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  bgButtonActive: {
    width: 24,
    height: 24,
  },
  plansDiscount: {
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: '#28AF6E',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
  },
  plansDiscountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  plansDesc: {
    gap: 5,
  },
  plansText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '500',
  },
  plansTextSub: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 12,
    fontWeight: '300',
  },
  continueButton: {
    marginVertical: 10,
    marginHorizontal: 24,
  },
  footer: {
    marginVertical: 10,
    marginHorizontal: 24,
    lineHeight: '132%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 9,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.52)',
    textAlign: 'center',
  },
});

export default PlansScreen;
