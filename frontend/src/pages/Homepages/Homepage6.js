import React, { useEffect } from 'react'

// MAIN COMPONENT
import MainFeatureToday from '../../Component/Home/Main/Feature-Today-Sec/MainFeature'
import MainBlockWrapperSec from '../../Component/Home/Main/Block-Wrap-Sec1/MainBlockSec'
import MainBlockWrap2 from '../../Component/Home/Main/Block-Wrap-Sec2/MainBlockWrap2'
import { sentFeatureArticles } from '../../../src/Component/Home/Main/Feature-Today-Sec/redux/action';
import { useSelector, useDispatch } from 'react-redux';

// import { sentFeatureArticles } from './redux/action';


const HomePage = () => {
  // const dispatch = useDispatch()
  // const getMainFeature = useSelector(state => state.featureToday);

  // const { error, mainFeature } = getMainFeature;

  // console.log('data=>', mainFeature);

  // useEffect(() => {
  //   dispatch(sentFeatureArticles())
  // }, [dispatch])

  return (
    <div>

      {/* Feature Today */}
      <MainFeatureToday/>
      {/* BLOCK-WRAPPER-SECTION */}
      <MainBlockWrapperSec />
      {/* BLOCK-WRAPPER-2 */}
      <MainBlockWrap2 />

    </div>
  )
}
// class HomePage extends React.Component {
//   render() {
//     return <div>

//       {/* Feature Today */}
//       <MainFeatureToday />
//       {/* BLOCK-WRAPPER-SECTION */}
//       <MainBlockWrapperSec />
//       {/* BLOCK-WRAPPER-2 */}
//       <MainBlockWrap2 />

//     </div>
//   }
// }

export default HomePage;
