import React, { Component } from 'react';
import {
  App,
  Panel,
  Views,
  View,
  Statusbar,
  Popover,
  Page,
  Navbar,
  Toolbar,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  List,
  ListItem,
  Button
} from 'framework7-react';
import LoginPage from '../pages/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import io from 'socket.io-client';
import 'framework7-icons';

const menu_dinas = [
  {
    title : 'Kuota Sekolah',
    iconf7 : 'person_3',
    link : '/editKuotaSekolah/',
  }
];

class app extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      f7params: {
        id: 'io.timkayu.simdik',
        name: 'Simdik',
        theme: 'ios',
        data: function () {
          return {
            user: {
              firstName: 'Khalid',
              lastName: 'Saifuddin',
            },
          };
        },
        routes: routes,
        panel: {
          leftBreakpoint: 960,
        },
        serviceWorker: this.$device.cordova ? {} : {
          path: '/service-worker.js',
        },
        input: {
          scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
          scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
        },
        statusbar: {
          overlay: this.$device.cordova && this.$device.ios || 'auto',
          iosOverlaysWebView: true,
          androidOverlaysWebView: false,
        },
      },
      tabBar:{
        beranda: true,
        kategori: false,
        cari: false,
        materi: false,
        profil: false,
      },
      username: '',
      password: '',
    };
  }
  
  onClickLinkTab = (menu) => {
    for (var property in this.props.tabBar) {
      this.props.tabBar[property] = false;
    }
    
    this.props.tabBar[menu] = true;

    this.props.setTabActive(this.props.tabBar);
  }

  onClickMenu(menu) {
    console.log(this.props);
  }

  componentDidMount = () => {
    // let socket = io(localStorage.getItem('socket_url'));
    // let params = {};

    // socket.emit('online', params, function (err) {
    //   if (err) {
    //     this.props.history.push('/');
    //   }
    // });
    // console.log(this);

    if(localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' && localStorage.getItem('user')){
      this.setState({
        routeParams: {
          sekolah_id: (localStorage.getItem('kode_aplikasi')  === 'PPDB-sekolah' ? (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).sekolah_id : null) : null),
          keyword : '',
          start: 0,
          limit: 10,
          urut: 'jarak',
          verifikasi: 'N',
          urut_pilihan: 1
        }
      },()=>{
        if(parseInt(localStorage.getItem('sudah_login')) === 1){

          this.props.getCalonPesertaDidikSekolah(this.state.routeParams).then((result)=>{
            this.props.setPendaftar((this.props.calon_pd_sekolah.countAll ? this.props.calon_pd_sekolah.countAll : '0'));
            // console.log(this.props.calon_pd_sekolah.countAll);
            // console.log(this.props.pendaftar);
          });
          
          this.props.PeringkatPesertaDidik(this.state.routeParams).then((result)=>{
            this.props.setCalon(this.props.peringkat_peserta_didik.countAll);
            // console.log(this.props.calon_pd_sekolah.countAll);
            // console.log(this.props.pendaftar);
          });
          
        }


      });

    }
  }

  gantiSemester = (b) => {
    localStorage.setItem('semester_id_aplikasi', b.target.value);
    console.log(localStorage.getItem('semester_id_aplikasi'));
  }

  keluar = () =>{
    localStorage.setItem('sudah_login', '0');
    localStorage.setItem('sudah_pilih_kota', '0');
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');

    window.location.href=localStorage.getItem('root_base');
  }

  alertLoginData() {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password);
  }

  componentDidMount() {
    setTimeout(() => {
    }, 3000);

    this.$f7ready((f7) => {
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
    });
  }

  render() {
    return (
      <App params={this.state.f7params} hideToolbarOnScroll>
        <Statusbar></Statusbar>
        {localStorage.getItem('sudah_pilih_kota') === '1' &&
        <>
        {localStorage.getItem('sudah_login') === '1' && localStorage.getItem('kode_aplikasi') !== 'PPDB-publik' &&
          <Panel className="mainMenu" left cover>
            <View>
              <Page>
                <Navbar title={localStorage.getItem('judul_aplikasi')}>
                  <img src={localStorage.getItem('logo_wilayah')} height="25" alt={localStorage.getItem('judul_aplikasi')} />
                </Navbar>
                <BlockTitle>MENU APLIKASI</BlockTitle>
                <List>
                  {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                    <ListItem link="/" view=".view-main" panelClose panel-close title="Beranda">
                      <i slot="media" className="f7-icons">house</i>
                    </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <ListItem link="/Cari/" view=".view-main" panelClose panel-close title="Cari Data Dapodik">
                    <i slot="media" className="f7-icons">search</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                  <ListItem link="/tambahCalonPesertaDidik/" view=".view-main" panelClose panel-close title="Formulir Pendaftaran">
                    <i slot="media" className="f7-icons">pencil_ellipsis_rectangle</i>
                  </ListItem>
                  }
                  {/* DaftarCalonPesertaDidikSekolah */}
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <ListItem link="/Daftar/" view=".view-main" panelClose panel-close title="Data Pendaftar">
                    <i slot="media" className="f7-icons">doc_plaintext</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <ListItem link="/DaftarCalonPesertaDidikSekolah/" view=".view-main" panelClose panel-close title={"Pendaftar (" + this.props.pendaftar + ")"}>
                    <i slot="media" className="f7-icons">doc_plaintext</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <ListItem link="/PeringkatCalon/" view=".view-main" panelClose panel-close title={"Calon Diterima ("+this.props.calon+")"}>
                    <i slot="media" className="f7-icons">checkmark_seal</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <ListItem link="/PeringkatCalonLain/" view=".view-main" panelClose panel-close title={"Calon Lainnya"}>
                    <i slot="media" className="f7-icons">chevron_down_circle</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <ListItem link="/detailCalonpdSekolah/" view=".view-main" panelClose panel-close title="Daftar Sekolah">
                    <i slot="media" className="f7-icons">building_2_fill</i>
                  </ListItem>
                  }
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <ListItem link="/JadwalKegiatan/" view=".view-main" panelClose panel-close title="Jadwal Kegiatan">
                    <i slot="media" className="f7-icons">calendar</i>
                  </ListItem>
                  }
                  {
                    localStorage.getItem('kode_aplikasi') === 'PPDB-dinas' && menu_dinas.map((n, key) => {
                      return (
                        <ListItem
                          key={key}
                          title={ n.title }
                          link={ n.link }
                          view=".view-main"
                          panelClose
                          panel-close
                        >
                          <i slot="media" className="f7-icons">{ n.iconf7 }</i>
                        </ListItem>
                      )
                    })
                  }
                  
                  {/* <ListItem link="/" view=".view-main" panelClose panel-close title="Petunjuk">
                    <i slot="media" className="f7-icons">book</i>
                  </ListItem>
                  <ListItem link="/" view=".view-main" panelClose panel-close title="Kuota">
                    <i slot="media" className="f7-icons">chart_bar</i>
                  </ListItem>
                  <ListItem link="/" view=".view-main" panelClose panel-close title="Pengumuman">
                    <i slot="media" className="f7-icons">bell</i>
                  </ListItem> */}
                  {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
                    <>
                      {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                        <ListItem link={"/Kuis/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)} view=".view-main" panelClose panel-close title="Kuis">
                          <i slot="media" className="f7-icons">pencil_circle_fill</i>
                        </ListItem>
                        }
                        {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                        <ListItem link="/Ruang/" view=".view-main" panelClose panel-close title="Ruang">
                          <i slot="media" className="f7-icons">circle_grid_hex_fill</i>
                        </ListItem>
                      }
                      {(localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') &&
                        <ListItem link={"/pertanyaanPengguna/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)} view=".view-main" panelClose panel-close title="Pertanyaan">
                          <i slot="media" className="f7-icons">question_square_fill</i>
                        </ListItem>
                      }
                    </>
                  }
                  {localStorage.getItem('sudah_login') === '0' && 
                    <ListItem link="/login/" view=".view-main" panelClose panel-close title="Login/Masuk">
                      <i slot="media" className="f7-icons">square_arrow_right</i>
                    </ListItem>
                  }
                  {localStorage.getItem('sudah_login') === '1' && localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                    <ListItem link="/ProfilPengguna/" view=".view-main" panelClose panel-close title="Profil Pengguna">
                      <i slot="media" className="f7-icons">person</i>
                    </ListItem>
                  }
                  {localStorage.getItem('sudah_login') === '1' && 
                    <ListItem link="/" onClick={this.keluar} panelClose panel-close title="Keluar">
                      <i slot="media" className="f7-icons">square_arrow_left</i>
                    </ListItem>
                  }
                </List>
                {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                <Block className="formRegisterWidget">
                  <img src="./static/images/formulir-illustration.png" alt="formulir ilustrasi"/>
                  <p>Daftarkan anak Anda segera ke sekolah terbaik!</p>
                  <Button href="/tambahCalonPesertaDidik/" view=".view-main" raised fill round color="orange">Daftar Sekarang</Button>
                </Block>
                }
              </Page>
            </View>
          </Panel>
        }
        </>
        }
        <Panel right cover style={{width:'280px'}} opened={this.props.panel_kanan_buka}>
          <View>
            <Page>
              <Navbar title={this.props.judul_panel_kanan}/>
              <Block style={{paddingLeft:'0px', paddingRight:'0px'}}>
                {this.props.isi_panel_kanan}
              </Block>
            </Page>
          </View>
        </Panel>
        <Views tabs className="safe-areas" hideToolbarOnScroll>
          {localStorage.getItem('sudah_pilih_kota') === '1' &&
          <>
          {localStorage.getItem('sudah_login') === '1' && localStorage.getItem('kode_aplikasi') !== 'PPDB-publik' &&
            <Toolbar className="mobileTab" labels bottom hideToolbarOnScroll>
              {localStorage.getItem('sudah_login') === '1' &&
                <>
                  <Link 
                    href="/" 
                    tabLinkActive={this.props.tabBar.beranda} 
                    iconIos="f7:house"
                    iconAurora="f7:house" 
                    iconMd="f7:house" 
                    text="Beranda"
                  />
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <Link 
                    href={"/Cari/"} 
                    iconIos="f7:search" 
                    iconAurora="f7:search" 
                    iconMd="f7:search" 
                    text="Cari"
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB' &&
                  <Link 
                  iconIos="f7:pencil_ellipsis_rectangle" 
                  iconAurora="f7:pencil_ellipsis_rectangle" 
                  iconMd="f7:pencil_ellipsis_rectangle" 
                  text="Formulir"
                  popoverOpen=".popover-menu"
                  className="formulir--menu"
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <Link 
                    href={"/DaftarCalonPesertaDidikSekolah/"} 
                    iconIos="f7:doc_plaintext" 
                    iconAurora="f7:doc_plaintext" 
                    iconMd="f7:doc_plaintext" 
                    text={"Pendaftar ("+this.props.pendaftar+")"}
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <Link 
                    href={"/PeringkatCalon/"} 
                    iconIos="f7:checkmark_seal" 
                    iconAurora="f7:checkmark_seal" 
                    iconMd="f7:checkmark_seal" 
                    text={"Diterima ("+this.props.calon+")"}
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-sekolah' &&
                  <Link 
                    href={"/PeringkatCalonLain/"} 
                    iconIos="f7:chevron_down_circle" 
                    iconAurora="f7:chevron_down_circle" 
                    iconMd="f7:chevron_down_circle" 
                    text="Lainnya"
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') !== 'PPDB-sekolah' &&
                  <Link 
                    href={"/Daftar/"} 
                    iconIos="f7:doc_plaintext" 
                    iconAurora="f7:doc_plaintext" 
                    iconMd="f7:doc_plaintext" 
                    text="Pendaftar"
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'PPDB-dinas' &&
                  <Link 
                    href={"/detailCalonpdSekolah/"} 
                    iconIos="f7:building_2_fill" 
                    iconAurora="f7:building_2_fill" 
                    iconMd="f7:building_2_fill" 
                    text="Sekolah"
                  />
                  }
                  {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
                    <>
                      <Link 
                        href={"/Kuis/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)} 
                        iconIos="f7:pencil_circle_fill" 
                        iconAurora="f7:pencil_circle_fill" 
                        iconMd="f7:pencil_circle_fill" 
                        text="Kuis"
                      />
                      <Link 
                        href="/Ruang" 
                        iconIos="f7:circle_grid_hex_fill" 
                        iconAurora="f7:circle_grid_hex_fill" 
                        iconMd="f7:circle_grid_hex_fill" 
                        text="Ruang"
                      />
                    </>
                  }
                </>
              }
              {localStorage.getItem('kode_aplikasi') !== 'SPM' &&
                <>
                  {localStorage.getItem('sudah_login') === '1' &&
                    <>
                      {localStorage.getItem('kode_aplikasi') === 'MEJA' &&
                        <Link 
                          href={"/pertanyaanPengguna/"+((localStorage.getItem('user') !== null && localStorage.getItem('user') !== '') ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)} 
                          iconIos="f7:question_square_fill" 
                          iconAurora="f7:question_square_fill" 
                          iconMd="f7:question_square_fill" 
                          text="Pertanyaan" 
                          style={{fontSize:'12px'}} 
                        />
                      }
                    </>
                  }
                </>
              }
              {localStorage.getItem('sudah_login') === '0' &&
                <Link 
                  href="/login" 
                  tabLinkActive={this.props.tabBar.beranda} 
                  iconIos="f7:square_arrow_right" 
                  iconAurora="f7:square_arrow_right" 
                  iconMd="material:square_arrow_right" 
                  text="Login" 
                />
              }
              <Link 
                iconIos="f7:ellipsis" 
                iconAurora="f7:ellipsis" 
                iconMd="material:ellipsis" 
                text="Lainnya"
                panelOpen="left" 
              />
            </Toolbar>
          }
          </>
          }
          <View id="view-beranda" main tab tabActive url="/" />
        </Views>
        <Popover className="popover-menu">
          <List>
            <ListItem link="/Cari/" popoverClose title="Cari dari Dapodik" />
            <ListItem link="/TambahCalonPesertaDidik" popoverClose title="Tambah Manual" />
          </List>
        </Popover>
        <LoginScreen id="my-login-screen">
          <LoginPage/>
        </LoginScreen>
      </App>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWindowDimension: Actions.updateWindowDimension,
    setLoading: Actions.setLoading,
    setTabActive: Actions.setTabActive,
    getCalonPesertaDidikSekolah: Actions.getCalonPesertaDidikSekolah,
    setPendaftar: Actions.setPendaftar,
    setCalon: Actions.setCalon,
    PeringkatPesertaDidik: Actions.PeringkatPesertaDidik
  }, dispatch);
}

function mapStateToProps({ App, PPDBPesertaDidik }) {
  return {
    window_dimension: App.window_dimension,
    loading: App.loading,
    tabBar: App.tabBar,
    judul_panel_kanan: App.judul_panel_kanan,
    isi_panel_kanan: App.isi_panel_kanan,
    panel_kanan_buka: App.panel_kanan_buka,
    pendaftar: App.pendaftar,
    calon_pd_sekolah: PPDBPesertaDidik.calon_pd_sekolah,
    peringkat_peserta_didik: PPDBPesertaDidik.peringkat_peserta_didik,
    calon: App.calon
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(app));
