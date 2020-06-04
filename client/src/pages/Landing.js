import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./Landing.css";
//import $ from "jquery";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='jumbotron'>
          <div className='container text-center'>
            <h1 className='display-3'>ONGAK</h1>
            <p>
              Experience a 24/7 world-wide jam session with ONGAK. Create new
              music, collaborate with others, and publish your songs.
            </p>
            <p>
              <a
                className='btn btn-primary btn-lg m-1'
                href='/register'
                role='button'
              >
                Register &raquo;
              </a>
              <a
                className='btn btn-primary btn-lg m-1'
                href='/login'
                role='button'
              >
                Log In &raquo;
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // componentDidMount() {
  //   $("head").append("<style>body{display:none;}");
  //   $(window).on("load", function () {
  //     $("body").fadeIn(0);
  //   });

  //   $(document).ready(function () {
  //     var hsize = $(window).height();
  //     if (hsize <= 640) {
  //       $("section").css("height", 640 + "px");
  //     } else {
  //       $("section").css("height", +hsize + "px");
  //     }
  //   });

  //   $(window).resize(function () {
  //     var hsize = $(window).height();
  //     if (hsize <= 640) {
  //       $("section").css("height", 640 + "px");
  //     } else {
  //       $("section").css("height", hsize + "px");
  //     }
  //   });

  //   $("head").append(
  //     "<style>.maincopy, .button:nth-child(1), .button:nth-child(2){display:none;}"
  //   );
  //   $(window).on("load", function () {
  //     $(".maincopy").delay(0).fadeIn(800);
  //     $(".button:nth-child(1)").delay(0).fadeIn(1400);
  //     $(".button:nth-child(2)").delay(0).fadeIn(2000);
  //   });

  //   $(document).ready(function () {
  //     var urlHash = Location.hash;
  //     if (urlHash) {
  //       $("body,html").stop().scrollTop(0);
  //       setTimeout(function () {
  //         scrollToAnker(urlHash);
  //       }, 100);
  //     }

  //     $('a[href^="#"]').click(function () {
  //       var href = $(this).attr("href");
  //       // eslint-disable-next-line
  //       var hash = href == "#" || href == "" ? "html" : href;
  //       scrollToAnker(hash);
  //       return false;
  //     });

  //     function scrollToAnker(hash) {
  //       var target = $(hash);
  //       var position = target.offset().top;
  //       $("body,html").stop().animate({ scrollTop: position }, 500);
  //     }
  //   });

  //   $(function () {
  //     $(".effect div, .effect i").css("opacity", "0");
  //     $(window).scroll(function () {
  //       $(".effect").each(function () {
  //         var imgPos = $(this).offset().top;
  //         var scroll = $(window).scrollTop();
  //         var windowHeight = $(window).height();
  //         if (scroll > imgPos - windowHeight + windowHeight / 5) {
  //           $("i, div", this).css("opacity", "1");
  //           $("i", this).css({ "font-size": "6em" });
  //         } else {
  //           $("i, div", this).css("opacity", "0");
  //           $("i", this).css({ "font-size": "3em" });
  //         }
  //       });
  //     });
  //   });

  //   $(function () {
  //     $(".effect1 h2, .effect1 .sentence, .effect1 .contentword").css(
  //       "opacity",
  //       "0"
  //     );
  //     $(window).scroll(function () {
  //       $(".effect1").each(function () {
  //         var imgPos = $(this).offset().top;
  //         var scroll = $(window).scrollTop();
  //         var windowHeight = $(window).height();
  //         if (scroll > imgPos - windowHeight + windowHeight / 5) {
  //           $(".effect1 h2, .effect1 .sentence, .effect1 .contentword").css(
  //             "opacity",
  //             "1"
  //           );
  //         } else {
  //           $(".effect1 h2, .effect1 .sentence, .effect1 .contentword").css(
  //             "opacity",
  //             "0"
  //           );
  //         }
  //       });
  //     });
  //   });
  // }

  // render() {
  //   return (
  //     <div className='body'>
  //       <header>
  //         <div id='logo'>
  //           <img src={require("./images/o2w.png")} alt='logo' />
  //         </div>
  //         <nav>
  //           <ul>
  //             <li>
  //               <a href='/register' className='signup'>
  //                 Sign up
  //               </a>
  //             </li>
  //             <li>
  //               <a href='/login'>Log in</a>
  //             </li>
  //           </ul>
  //         </nav>
  //         <div id='nav-drawer'>
  //           <input id='nav-input' type='checkbox' className='nav-unshown' />
  //           <label id='nav-open' for='nav-input'>
  //             <span></span>
  //           </label>
  //           <label
  //             className='nav-unshown'
  //             id='nav-close'
  //             for='nav-input'
  //           ></label>{" "}
  //           <div id='nav-content'>
  //             <ul>
  //               <li>
  //                 <a href='/register'>Sign up</a>
  //               </li>
  //               <li>
  //                 <a href='/login'>Log in</a>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </header>
  //       <main className='cover-container d-flex h-100 p-3 mx-auto flex-column '>
  //         <section className='inner cover'>
  //           <div className='typewriter'>
  //             <h1>Create.</h1>
  //             <h1>Collaborate.</h1>
  //           </div>
  //           <br />
  //           <br />
  //           <br />
  //           <p className='maincopy'>
  //             A 24/7 world-wide jam session for passionate musicians.
  //             <br />
  //             Get your music out there for people to listen to, then let them
  //             add their creative touch.
  //           </p>
  //           <br />
  //           <br />
  //           <br />
  //           <div id='mainbuttons'>
  //             <a className='button' href='/register'>
  //               JOIN NOW
  //             </a>
  //             <a className='button' href='#section2'>
  //               LEARN MORE
  //             </a>
  //           </div>
  //         </section>
  //         <section id='section2'>
  //           <a href='#section1'>
  //             <i className='fas fa-sort-up allowup'></i>
  //           </a>
  //           <div className='effect1'>
  //             <h2>What is ONGAK?</h2>
  //             <div className='contentbox'>
  //               <div className='contentword'>
  //                 <h1>音楽</h1>
  //                 <p>" O N G A K U "</p>
  //               </div>
  //               <div className='sentence'>
  //                 <p className='sentbig'>
  //                   <b>ONGAK</b> is a platform where you can share your musical
  //                   styles and talents with the creative minds all around the
  //                   wolrd, inspire and be inspired, find your favorite artist
  //                   and collabolate, and make the most of the power of music in
  //                   your life and in the world.
  //                 </p>
  //                 <br />
  //                 <p className='sentsm'>
  //                   The name ONGAK is taken from the japanese word ongaku which
  //                   means music. The first letter means sound, and the other has
  //                   meanings such as enjoyment or ease.
  //                   <br />
  //                   Our mission is to provide a place for more creative and easy
  //                   music-making for every musicians anywhere so that you can
  //                   enjoy music like you have never done before.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <a href='#section3'>
  //             <i className='fas fa-caret-down allowdown'></i>
  //           </a>
  //         </section>

  //         <section id='section3'>
  //           <a href='#section2'>
  //             <i className='fas fa-sort-up allowup'></i>
  //           </a>
  //           <div className='effect'>
  //             <div>
  //               <h2>Do What You Love</h2>
  //             </div>
  //             <i className='fas fa-hand-holding-heart heart'></i>
  //             <div>
  //               <div className='contentbox'>
  //                 <p>
  //                   Only play one instrument? Can come up with a cool riff, but
  //                   don't know how to get things together to make a song? We got
  //                   your back.
  //                   <br />
  //                   <b>Do what you love, things you're good at.</b> Then share
  //                   your ideas with the musicians from all around the world, let
  //                   them add to your pieces. Experience the whole new excitement
  //                   of music creation.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <a href='#section4'>
  //             <i className='fas fa-caret-down allowdown'></i>
  //           </a>
  //         </section>

  //         <section id='section4'>
  //           <a href='#section3'>
  //             <i className='fas fa-sort-up allowup'></i>
  //           </a>
  //           <div className='effect'>
  //             <div>
  //               <h2>Connect, Collaborate</h2>
  //             </div>
  //             <i className='fas fa-users connect'></i>
  //             <div>
  //               <div className='contentbox'>
  //                 <p>
  //                   <b>
  //                     ONGAK makes it easier to connect and collaborate with many
  //                     other musicians in the world.
  //                   </b>{" "}
  //                   Find the musician has a taste similar to yours, or look for
  //                   the artist gives you a new sensation.
  //                   <br />
  //                   <br />
  //                   If you've found the one you want to work with, you can also
  //                   create a private working space with your premiere account.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <a href='#section5'>
  //             <i className='fas fa-caret-down allowdown'></i>
  //           </a>
  //         </section>

  //         <section id='section5'>
  //           <a href='#section4'>
  //             <i className='fas fa-sort-up allowup'></i>
  //           </a>
  //           <div className='effect'>
  //             <div>
  //               <h2>Be Inspired, Add</h2>
  //             </div>
  //             <i className='far fa-lightbulb light'></i>
  //             <div>
  //               <div className='contentbox'>
  //                 <p>
  //                   Stuck in a slump? No worries! Explore and be inspired by the
  //                   new musical ideas shared by many musicians out there, and
  //                   simply add to them or improve them to make music. Improve
  //                   through interaction, and see how far you'll go.
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <a href='#section6'>
  //             <i className='fas fa-caret-down allowdown'></i>
  //           </a>
  //         </section>

  //         <section id='section6'>
  //           <a href='#section1'>
  //             <i className='fas fa-sort-up allowup'></i>
  //           </a>
  //           <div className='effect'>
  //             <div>
  //               <h2 className='lasth2'>Let's Get Started.</h2>
  //             </div>
  //             <br />
  //             <br />
  //             <div className='contentbox'>
  //               <a className='button' href='/register'>
  //                 SIGN UP FOR <b>FREE</b>
  //               </a>
  //             </div>
  //           </div>
  //         </section>
  //       </main>
  //     </div>
  //   );
  // }
}
