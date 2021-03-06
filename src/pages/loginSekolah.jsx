import React, {Component} from 'react';
import {
  Page,
  Block,
  List,
  Button,
  LoginScreenTitle,
  ListInput,
  Progressbar
} from 'framework7-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import GoogleLogin from 'react-google-login';
import io from 'socket.io-client';

class loginSekolah extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      error: null,
      loading: false,
      routeParams:{
        username: '',
        password: '',
      }
    }
  }
  
  backClick = () => {
    let properti = 'beranda';
    
    for (var property in this.props.tabBar) {
      this.props.tabBar[property] = false;
    }

    if(this.props.f7router.url.replace("/","").replace("/","") !== ""){
      properti = this.props.f7router.url.replace("/","").replace("/","");
    }

    this.props.tabBar[properti] = true;
    this.props.setTabActive(this.props.tabBar);
  }

  alertLoginData = () => {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
  }

  responseGoogle = (response) => {
    if(typeof(response.profileObj.email) !== 'undefined') {
      this.setState({
        ...this.state,
        loading: true,
        googleCheck: {
          username: response.profileObj.email,
        }
      }, ()=> {
        let socket = io(localStorage.getItem('socket_url'));

        this.props.getPengguna(this.state.googleCheck).then((result)=> {
          if(this.props.pengguna.total < 1) {
              this.setState({
                  loading:true,
                  routeParams:{
                    ...this.state.routeParams,
                    data: {
                      username: response.profileObj.email,
                      nama: response.profileObj.name,
                      gambar: response.profileObj.imageUrl,
                    }
                  }
              }, ()=> {
                this.props.buatPengguna(this.state.routeParams).then((result)=> {
                  this.setState({
                    loading: false,
                  }, ()=> {
                    localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
                    localStorage.setItem('sudah_login',  '0');
                    localStorage.setItem('pengguna_sekolah',  '1');

                    // this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
                    
                    let params = {
                      nama: JSON.parse(localStorage.getItem('user')).nama,
                      id: JSON.parse(localStorage.getItem('user')).pengguna_id,
                    };

                    // socket.emit('login', params, (err) => {
                    //   if (err) {}
                    // });

                    // window.location.href="/";
                      
                  })
                });
              });
          } else {
            this.setState({
              loading: false,
            }, ()=> {
              localStorage.setItem('user', JSON.stringify(this.props.pengguna.rows[0]));
              localStorage.setItem('sudah_login',  '1');

              this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
              
              let params = {
                nama: JSON.parse(localStorage.getItem('user')).nama,
                id: JSON.parse(localStorage.getItem('user')).pengguna_id,
              };

              socket.emit('login', params, (err) => {
                if (err) {}
              });
              
              window.location.href="/";
            });
          }
        });
      });
    }
  }

  doLogin = () => {
    this.setState({
      loading: true,
    }, ()=> {

      this.setState({
        routeParams: {
          ...this.state.routeParams,
          tampil_koreg: 1
        }
      },()=>{
        this.props.getPPDBSekolah(this.state.routeParams).then((result)=>{
          // console.log(this.props.ppdb_sekolah);

          if(this.props.ppdb_sekolah.count > 0){
            //sekolah ditemukan
            
            if(this.props.ppdb_sekolah.rows[0].koreg === '1'){
              //koreg sesuai
              // this.$f7.dialog.alert("Sekolah tidak ditemukan! Mohon masukkan NPSN sekolah yang sesuai!", 'Peringatan');
              // localStorage.setItem('token', result.payload.token);
              localStorage.setItem('user', JSON.stringify(this.props.ppdb_sekolah.rows[0]));
              localStorage.setItem('sudah_login',  '1');

              this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil')
              
              window.location.href=localStorage.getItem('root_base');
              
            }else{
              //koreg tidak sesuai
              this.$f7.dialog.alert("Kode registrasi tidak sesuai!", 'Peringatan');
              this.setState({
                loading:false
              })
            }

          }else{
            //sekolah tidak ditemukan
            this.$f7.dialog.alert("Sekolah tidak ditemukan! Mohon masukkan NPSN sekolah yang sesuai!", 'Peringatan');
          }
        });
      });
      // this.props.login(this.state.routeParams).then((result)=> {
      //   this.setState({
      //     loading: false,
      //   }, ()=> {
      //       if(typeof(result.payload.token) !== 'undefined') {
      //         localStorage.setItem('token', result.payload.token);
      //         localStorage.setItem('user', JSON.stringify(result.payload.user));
      //         localStorage.setItem('sudah_login',  '1');

      //         this.$f7.dialog.alert('Selamat datang, '+JSON.parse(localStorage.getItem('user')).nama, 'Berhasil');
              
      //         let params = {
      //           nama: JSON.parse(localStorage.getItem('user')).nama,
      //           id: JSON.parse(localStorage.getItem('user')).pengguna_id,
      //         };
              
      //         socket.emit('login', params, (err) => {
      //           if (err) {}
      //         });
              
      //         window.location.href=localStorage.getItem('root_base');
      //         // window.location.href="/";
      //       } else {
      //         localStorage.setItem('sudah_login',  '0');

      //         this.$f7.dialog.alert(result.payload.error, 'Peringatan');
      //       }
      //   })
      // });


    });
  }

  render() {
    return (
      <Page className={localStorage.getItem('tema_warna') === 'ungu-terong' ? "loginPage" : "loginPage2"} name="loginSekolah" hideBarsOnScroll>
        {this.state.loading &&
          <Progressbar className="loginProgress" infinite color="blue" />
        }
        <Block className="loginBox">
          <div className="logoApp">
            <img src={localStorage.getItem('logo_wilayah')} height="25" alt="kabupaten lumajang" />
            <LoginScreenTitle>
              {localStorage.getItem('judul_aplikasi')}
              <div style={{fontStyle:'20px'}}>Masuk Dasbor Sekolah</div>
            </LoginScreenTitle>
          </div>
          <List form>
            <ListInput
              label="NPSN"
              type="text"
              name="npsn"
              placeholder="Masukkan NPSN Sekolah Anda..."
              disabled={(this.state.loading ? true : false)}
              value={this.state.routeParams.npsn}
              onInput={(e) => this.setState({routeParams:{...this.state.routeParams,npsn: e.target.value}})}
            />
            <ListInput
              label="Kode Registrasi"
              type="text"
              name="kode_registrasi"
              disabled={(this.state.loading ? true : false)}
              placeholder="Masukkan Kode Registrasi Dapodik..."
              value={this.state.routeParams.koreg}
              onInput={(e) => this.setState({routeParams:{...this.state.routeParams,koreg: e.target.value}})}
            />
          </List>
          <Button 
              fill 
              large
              className="loginBtn"
              iconIos="f7:square_arrow_right" 
              iconAurora="f7:square_arrow_right" 
              iconMd="material:enter"  
              title="Masuk" 
              disabled={(this.state.loading ? true : false)}
              onClick={this.doLogin}
          >
              &nbsp; Masuk Dasbor Sekolah
          </Button>
          <p className="loginFooter">Dinas Pendidikan {localStorage.getItem('wilayah_aplikasi')} ??2020</p>
          <br/>
          <p style={{textAlign:'center', marginBottom:'-20px', fontSize:'10px'}}>
            Didukung oleh
            <br/>
            <img src="static/images/ppdblite_logo.png" height="25" />
          </p>
          <br/>
        </Block>
        <div className="animatedWave wave--1"></div>
        <div className="animatedWave wave--2"></div>
        <div className="animatedWave wave--3"></div>
      </Page>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    login: Actions.login,
    getPengguna: Actions.getPengguna,
    buatPengguna: Actions.buatPengguna,
    getPPDBSekolah: Actions.getPPDBSekolah
  }, dispatch);
}

function mapStateToProps({ App, PPDBSekolah }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    tabBar: App.tabBar,
    pengguna: App.pengguna,
    ppdb_sekolah: PPDBSekolah.ppdb_sekolah
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(loginSekolah));
  