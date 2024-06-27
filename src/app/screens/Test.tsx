// @ts-nocheck
import React, { Component } from "react";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2023,
    });
  };

  // birinchi homepage borganda yani render bolgan componentDidMount consoleda chiqadi
  componentDidMount() {
    console.log("componentDidMount");
    // runs after first render => backend dan datani olish uchun lifecycle methodidan foydalanamiz
    // va qabul qilingan malumotlar render da foydalaniladi
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    // runs before component unmount
  }

  componentDidUpdate() {
    console.log("component Did update");
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model : {this.state.model} - Year :{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change detail
        </button>
      </div>
    );
  }
}
export default Test;

/*
  " componentDidMount () => backend dan datani olish maqsadida 
  yani birinchi front-end loyihamizni qurilishi uchun 
  kerak boladigon datani backend dan retrieve (qabul qilib olamiz)."

  --------------------------------------------------------------
  " componentWillUnmount () => malum bir pageni yashirilishidan oldin,
   malum bir aperatsiyalarni qilishimiz talab etilsa shu lifecycle ni ishlatamiz."

  --------------------------------------------------------------

  " componentDidUpdate () => DOM da bolgan ozgarishni amalga oshirib beradi. "

 */
/* ============================================================ */
/** React Hooks  **/

/* 
  "Hooklar React ni 16.8 versiyasida taqdim etilgan"

  "Hooklar bizga aynan functional componentimizni 
  ichida suniy stateni hosil qilish, yoki reactni,
   boshqa featurelari yani fazalarini functional ,
   componentlarda ham qura olish imkonini berdi."

-------------------------------------------------------

   " Malum bir operatsiyalar sodir bulganda reactga
    signal boradi va react application signallarda 
    malum bir operatsiyalarni amalga oshiradi."

---------------------------------------------------------
  "useState() hook ==> Class Componentini suniy state ni hosil qilib beradi."

 ---------------------------------------------------------
  "useEffect() hook ==> Class Componentdagi lifecycle (3 fazani ) hosil qilib beradi."

  --------------------------------------------------------
   /*
   useEffect() [] agar array dependency ga hech qanday qiymat pass qimagan bolsak:
   har doim component birinchi marta qurilganda
   bir marta ishga tushadi. 
 ------------------------------
   malum bir qiymatni agar [] array dependencyga pass 
   qilsak har qanday 
   update hosil bolganda yana ishga tushadi 
   va componentDidUpdate() mantigini bajarib beradi
  */

/* =================================================== */

/* Patternlarni 2 toifasi mavjud bo'lib: 
  1) Architectural Pattern => butun bir tizimni ishlashini tamirlab beradigon bir qolib.

  2) Design Pattern => malum bir uchastkalar ishini hal qilib beradi.

  ---------------------------------------------------------------------

  Redux 4 qisimdan iborat bolib ular quyidagilar hisoblanade: 
  1) View/UI 
  2) Action 
  3) Reducers 
  4) Store
  */

/*
    Backend server data request => DATA
    SLICE: DATA => Store (Redux) Backend dan qabul qilgan  malumotni Redux Storega joylaydi..
    @ts-ignore

    SELECTOR: Malumotlar qayd qilingandan songina SELECTOR ni ishlata olamiz. Storega joylagan datani qabul qilish.
   */

/*-------------------------------------------------------------------------- */

/**  Reduxda ikki hil oqim mavjud bolib  **/
//1) Dispatch oqimi
//2) Subscription oqimi
// Redux architecture da asosiy urgu reducer() larga beriladi.

// dispatch => slice => backend dan kelgan malumotni olib store ga yozadi
// subscribe => selector => storedage malumotni viewga yetkazb beradi

// boilerplate = biror bir kodni ishlashi uchun yoziladigon kod!

/* -------------------------------------------------------------------------- */
/**  Redux Store  **/
/*
JSON formatda Backend Server dan olingan DATA ni birinchi ishlatishdan oldin 
REDUX STORE ga borib joylaymiz va u joylangan DATA ni BURAK application ni ixtiyoriy 
componentida qabul qilish imkoniyati yaratiladi. Sababi STORE bitta va u barcha COMPONENTLAR 
uchun ochiq hisoblanadi.

-------------------------------------------------------------------------- 

NOTE! REDUX STORE ni hosil qilishdan oldin birinchi navbatda butun tizimni 
type integration ni amalga oshirishimiz kerak!
 */
