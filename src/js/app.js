// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7-React Plugin
import Framework7React from 'framework7-react';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.jsx';

// Init F7 Vue Plugin
Framework7.use(Framework7React)

//localStorage config
// localStorage.setItem('api_base','http://118.98.166.82:8881');
// localStorage.setItem('google_api','188472097829-q54nne8p4mdp0he19pivpg1sf6htd04e.apps.googleusercontent.com');
// localStorage.setItem('api_base','http://localhost:8000/');
// localStorage.setItem('api_base','http://117.53.44.48:8080/');
// localStorage.setItem('api_base','http://117.53.47.95:8000');
// localStorage.setItem('api_base','http://117.53.44.48:8080');
// localStorage.setItem('api_dapodik','http://simdikapi:8888');
// localStorage.setItem('api_base','http://117.53.47.43:8080');
// localStorage.setItem('api_base','http://ppdb:8888');
// localStorage.setItem('google_api','188472097829-4h5peopg70ndp9g1p9seg1abgkg64ot4.apps.googleusercontent.com');

// // 026100
// localStorage.setItem('judul_aplikasi','Diskuis');
// localStorage.setItem('sub_judul_aplikasi','Diskusi dan Kuis');
// localStorage.setItem('kode_aplikasi','MEJA');
// localStorage.setItem('tema_warna_aplikasi','biru-1');
// localStorage.setItem('kode_aplikasi','MEJA');
// localStorage.setItem('wilayah_aplikasi','');
// localStorage.setItem('kode_wilayah_aplikasi','026100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('semester_id_aplikasi','20191'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
// localStorage.setItem('versi_aplikasi','2020.02.01');
// localStorage.setItem('logo_aplikasi',"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png");
// localStorage.setItem('socket_url',"http://localhost:5000");


// ====================================
// LUMAJANG
// ====================================

localStorage.setItem('api_base','http://117.53.47.95:8000');
localStorage.setItem('google_api','1010108449023-6qolnf5bdkckntc94vq88brt28pgu04n.apps.googleusercontent.com'); // lumajang

// localStorage.setItem('judul_aplikasi','Hasil Seleksi PPDB Lumajang');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kabupaten Lumajang');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Lumajang');
// localStorage.setItem('kode_wilayah_aplikasi','052100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('publik','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/f/f4/Lambang_Kabupaten_Lumajang.png');
// localStorage.setItem('lintang_aplikasi','-8.109038');
// localStorage.setItem('bujur_aplikasi','113.141552');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB-publik');
// localStorage.setItem('root_base','/');
// localStorage.setItem('tema_warna','ungu-terong');

// localStorage.setItem('judul_aplikasi','PPDB Lumajang');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kabupaten Lumajang');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Lumajang');
// localStorage.setItem('kode_wilayah_aplikasi','052100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/f/f4/Lambang_Kabupaten_Lumajang.png');
// localStorage.setItem('lintang_aplikasi','-8.109038');
// localStorage.setItem('bujur_aplikasi','113.141552');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB');
// localStorage.setItem('root_base','/');
// localStorage.setItem('tema_warna','ungu-terong');

// localStorage.setItem('judul_aplikasi','PPDB Lumajang');
// localStorage.setItem('sub_judul_aplikasi','Dasbor Dinas');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Lumajang');
// localStorage.setItem('kode_wilayah_aplikasi','052100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/f/f4/Lambang_Kabupaten_Lumajang.png');
// localStorage.setItem('lintang_aplikasi','-8.109038');
// localStorage.setItem('bujur_aplikasi','113.141552');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB-dinas');
// localStorage.setItem('root_base','/dinas/');
// localStorage.setItem('tema_warna','ungu-terong');

localStorage.setItem('judul_aplikasi','PPDB Lumajang');
localStorage.setItem('sub_judul_aplikasi','Dasbor Sekolah');
localStorage.setItem('wilayah_aplikasi','Kabupaten Lumajang');
localStorage.setItem('kode_wilayah_aplikasi','052100');
localStorage.setItem('id_level_wilayah_aplikasi','2');
localStorage.setItem('sudah_pilih_kota','1');
localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/f/f4/Lambang_Kabupaten_Lumajang.png');
localStorage.setItem('lintang_aplikasi','-8.109038');
localStorage.setItem('bujur_aplikasi','113.141552');
localStorage.setItem('zoom_aplikasi','10');
localStorage.setItem('kode_aplikasi','PPDB-sekolah');
localStorage.setItem('root_base','/sekolah/');
// localStorage.setItem('root_base','/');
localStorage.setItem('tema_warna','ungu-terong');

// ====================================
// END OF LUMAJANG
// ====================================



// // ====================================
// // MALUKU TENGAH
// // ====================================

// localStorage.setItem('api_base','http://117.53.47.43:8080');
// localStorage.setItem('google_api','1010108449023-hkjibdo11irpvod6v3mfvitgdf4qm8rr.apps.googleusercontent.com'); // yang baru maluku tengah

// localStorage.setItem('judul_aplikasi','PPDB Maluku Tengah');
// localStorage.setItem('sub_judul_aplikasi','Dinas Pendidikan Kabupaten Maluku Tengah');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Maluku Tengah');
// localStorage.setItem('kode_wilayah_aplikasi','210100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/3/3d/Lambang_Kabupaten_Maluku_Tengah.png');
// localStorage.setItem('lintang_aplikasi','-3.140835');
// localStorage.setItem('bujur_aplikasi','129.260976');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB');
// localStorage.setItem('root_base','/');
// localStorage.setItem('tema_warna','toska-lumut');

// localStorage.setItem('judul_aplikasi','PPDB Maluku Tengah');
// localStorage.setItem('sub_judul_aplikasi','Dasbor Dinas');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Maluku Tengah');
// localStorage.setItem('kode_wilayah_aplikasi','210100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/3/3d/Lambang_Kabupaten_Maluku_Tengah.png');
// localStorage.setItem('lintang_aplikasi','-3.140835');
// localStorage.setItem('bujur_aplikasi','129.260976');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB-dinas');
// // localStorage.setItem('root_base','/dinas/');
// localStorage.setItem('root_base','/');
// localStorage.setItem('tema_warna','toska-lumut');

// localStorage.setItem('judul_aplikasi','PPDB Maluku Tengah');
// localStorage.setItem('sub_judul_aplikasi','Dasbor Sekolah');
// localStorage.setItem('wilayah_aplikasi','Kabupaten Maluku Tengah');
// localStorage.setItem('kode_wilayah_aplikasi','210100');
// localStorage.setItem('id_level_wilayah_aplikasi','2');
// localStorage.setItem('sudah_pilih_kota','1');
// localStorage.setItem('logo_wilayah','https://upload.wikimedia.org/wikipedia/commons/3/3d/Lambang_Kabupaten_Maluku_Tengah.png');
// localStorage.setItem('lintang_aplikasi','-3.140835');
// localStorage.setItem('bujur_aplikasi','129.260976');
// localStorage.setItem('zoom_aplikasi','10');
// localStorage.setItem('kode_aplikasi','PPDB-sekolah');
// // localStorage.setItem('root_base','/sekolah/');
// localStorage.setItem('root_base','/');
// localStorage.setItem('tema_warna','toska-lumut');

// // ====================================
// // END OF MALUKU TENGAH
// // ====================================

// localStorage.setItem('google_api','1010108449023-6qolnf5bdkckntc94vq88brt28pgu04n.apps.googleusercontent.com'); // lumajang
// localStorage.setItem('api_base','http://ppdb:8888');
// localStorage.setItem('google_api','1010108449023-6qolnf5bdkckntc94vq88brt28pgu04n.apps.googleusercontent.com'); // lumajang
// localStorage.setItem('api_base','http://mejabantu.one/');

//////
// localStorage.setItem('kode_aplikasi','PPDB');
localStorage.setItem('tema_warna_aplikasi','biru-1');
localStorage.setItem('jenjang_aplikasi','5-6-13-15-29'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
localStorage.setItem('semester_id_aplikasi','20192'); // 5=SD, 6=SMP, 13=SMA, 15=SMK, 29=SLB, 1=PAUD
localStorage.setItem('versi_aplikasi','2020.05.01');
// localStorage.setItem('logo_aplikasi',"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png");
localStorage.setItem('socket_url',"http://localhost:5000");
localStorage.setItem('sudah_pilih_kota', (parseInt(localStorage.getItem('sudah_pilih_kota')) === 1 ? localStorage.getItem('sudah_pilih_kota') : '0'));
localStorage.setItem('periode_kegiatan_id','2020');

// localStorage.setItem('initial_route','/DataPokokSekolah/');
// localStorage.setItem('show_toolbar','1');

document.title = localStorage.getItem('judul_aplikasi') + " - " + localStorage.getItem('sub_judul_aplikasi');

if(localStorage.getItem('sudah_login') === null ||localStorage.getItem('sudah_login') === ''){
  localStorage.setItem('sudah_login', '0');
}

if(localStorage.getItem('riwayat_kata_kunci') === null){
  localStorage.setItem('riwayat_kata_kunci', '');
}


// Mount React App
ReactDOM.render(
  <Provider store={store}>
    {React.createElement(App)}
  </Provider>,
  document.getElementById('app'),
);