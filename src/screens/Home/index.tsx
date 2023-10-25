import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {getCategories, getQuestions} from '../../services/api';
import LoadingScreen from '../../components/Loading';
function HomeScreen() {
  const {width} = Dimensions.get('window');
  const [searchText, setSearchText] = useState('');
  const [questions, setQuestions] = useState<any>();
  const [categories, setCategories] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.itemContainer} key={index}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.uri);
          }}>
          <Image source={{uri: item.image_uri}} style={styles.imageItem} />

          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategories = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.itemCategories} key={index}>
        <TouchableOpacity>
          <View style={styles.itemCard}>
            <Text style={styles.itemCardLeftText}>{item.title}</Text>
            <ImageBackground
              source={{uri: item.image.url}}
              style={styles.categoriesBg}
              resizeMode="cover">
              {/* <View style={styles.itemCardLeft}>
              <Text style={styles.itemCardLeftText}>{item.title}</Text>
            </View> */}
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleFilterData = (val: any) => {
    setSearchText(val);
    const filtered = categories.filter((item: any) =>
      item.name.toLowerCase().includes(val.toLowerCase()),
    );
    setCategories(filtered);
  };

  const getCategoriesFunc = async () => {
    getCategories()
      .then(result => {
        setCategories(result.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getQuestionsFunc = async () => {
    getQuestions()
      .then(result => {
        setQuestions(result.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getServicesAll = async () => {
    try {
      await getQuestionsFunc();
      await getCategoriesFunc();
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getServicesAll();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      getCategoriesFunc();
    }
  }, [searchText]);
  return (
    <>
      {!loading ? (
        <ScrollView>
          <View style={styles.Wrapper}>
            <Text style={styles.text}>Hi, plant lover!</Text>
            <Text style={[styles.text, styles.textSub]}>
              Good Afternoon! ⛅
            </Text>
          </View>

          <ImageBackground
            style={styles.desc}
            source={require('../../../assets/images/homepageheaderbg.png')}
            resizeMode="contain">
            <View style={styles.inputContainer}>
              <Image
                source={require('../../../assets/images/search-icon.png')}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.input}
                onChangeText={(e: any) => {
                  console.log('e', e);
                  handleFilterData(e);
                }}
                placeholder="Search for plants"
                keyboardType="default"
              />
            </View>
          </ImageBackground>
          <View style={styles.imgContainer}>
            <TouchableOpacity style={styles.plansArea} onPress={() => {}}>
              <View style={styles.buttonInside}>
                <View style={styles.leftIcon}>
                  <Image
                    source={require('../../../assets/images/mailicon.png')}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.plansDesc}>
                  <View>
                    <Image
                      source={require('../../../assets/images/label1.png')}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Image
                      source={require('../../../assets/images/label2.png')}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/images/arrow.png')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.questionAreaTitle}>
            <Text style={styles.questionText}>Get Started</Text>
          </View>

          <View style={styles.container}>
            {questions && (
              <Carousel
                data={questions && questions}
                renderItem={_renderItem}
                windowSize={2}
                itemWidth={240}
                sliderWidth={width}
                activeSlideAlignment="start"
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
              />
            )}
          </View>
          <View>
            {categories && (
              <FlatList
                data={categories}
                renderItem={renderCategories}
                keyExtractor={item => item.id}
                numColumns={2}
                style={styles.flatList}
              />
            )}
          </View>
        </ScrollView>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 50,
    paddingBottom: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#13231B',
  },
  textSub: {
    fontSize: 24,
    fontWeight: '500',
    color: '#13231B',
  },
  desc: {
    minHeight: 70,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainer: {
    padding: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 35,
    zIndex: 2,
  },
  input: {
    width: '100%',
    maxHeight: 44,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: 'rgba(60, 60, 67, 0.25)',
    paddingLeft: 40,
  },

  imgContainer: {
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plansArea: {
    margin: 13,
    maxWidth: 370,
    borderRadius: 14,

    backgroundColor: '#24201A',
    width: '100%',
    minHeight: 60,
    marginTop: 10,
    padding: 15,
  },
  buttonInside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  plansDesc: {
    gap: 5,
  },
  questionAreaTitle: {
    paddingLeft: 25,
  },
  questionText: {
    color: '#13231B',
    fontSize: 15,
    fontWeight: '500',
  },
  container: {
    padding: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    borderRadius: 8,

    overflow: 'hidden',
    marginTop: 20,
    position: 'relative',
    marginLeft: 24,
  },
  itemCategories: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
  },
  flatList: {
    paddingLeft: 24,
    paddingRight: 14,
    paddingTop: 24,
    marginBottom: 30,
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#3c3c431a',
    backgroundColor: '#F4F6F6',
    overflow: 'hidden',
    width: '100%',
    height: 152,
    display: 'flex',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    position: 'relative',
  },
  itemCardLeftText: {
    padding: 16,
    width: 125,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    color: '#13231B',
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesBg: {
    width: 120,
    height: 115,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  itemText: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    padding: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageItem: {
    width: 240, // Resim genişliği
    height: 164, // Resim yüksekliği
    borderRadius: 8,
  },
});

export default HomeScreen;
