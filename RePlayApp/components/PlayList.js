import React from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from './music.jpeg';
import { StyleSheet, Image, View, Text } from 'react-native';

export const PlayList = ({ playlist }) => {
  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: '18rem' }}>
                  <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.images) ? (
                      <Card.Img variant="top" src={item.images[0].url} alt="" />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <small>By {item.owner.display_name}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const PlayListCard = ({img, title}) => {
  return(
    <View style={styles.container}>
      <Image 
        style = {{height:60, width:60}}
        source={{uri:img}} />
      <View style={styles.textCont}>
        <Text style = {styles.text}>(title)</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    minWidth:170,
    maxWidth:210,
    flexDirection: "row",
    alignItems:'center',
    justifyContent: "subContainer",
    borderRadius: 4,
    marginRight:8,
    marginBotton:8,
  },
  textCont:{
    textAlign:"center",
    width:"55%"
  },
  text:{
    color:"blue"
  },
  subContainer:{
    paddingRight: 15,
    paddingLeft: 15
  }
})