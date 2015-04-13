package com.fdts.tabletdraw;

import java.util.ArrayList;
import java.util.List;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.NetworkInfo.State;
import android.os.StrictMode;
import android.preference.PreferenceManager;
import android.util.Log;

import com.movl.connect.IMOVLConnectDelegate;
import com.movl.connect.MOVLConnect;
import com.movl.connect.model.IMCResult;
import com.movl.connect.model.IMCRoom;
import com.movl.connect.model.IMCUser;
import com.movl.connect.model.MCData;

public class Connect extends Application implements IMOVLConnectDelegate {

	public static final String LOG_TAG = "Tablet_Draw";

	public static final String APP_KEY = "9f16a349-1c4e-4cef-9dcb-cc90f92fd4d1";

	private ConnectivityManager cMgr;

	private SharedPreferences prefs;

	private MOVLConnect client;

	private List<IMOVLConnectDelegate> listeners;

	// prevent error on Android 2.2: http://code.google.com/p/android/issues/detail?id=9431
	static {
		// System.setProperty("java.net.preferIPv4Stack", "true");
		// System.setProperty("java.net.preferIPv6Addresses", "false");
	}

	@Override
	public void onCreate() {
		super.onCreate();

		// this can only used with Android 2.3 or later

		StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().detectAll().penaltyLog().build());

		cMgr = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
		prefs = PreferenceManager.getDefaultSharedPreferences(this);

		listeners = new ArrayList<IMOVLConnectDelegate>();

		client = new MOVLConnect(this, APP_KEY);
	}

	// not guaranteed to be called
	@Override
	public void onTerminate() {
		super.onTerminate();
	}

	public MOVLConnect getClient() {
		return client;
	}

	public SharedPreferences getPrefs() {
		return this.prefs;
	}

	//
	// MOVL Event Listener/Delegate/Callback
	//

	public void addListener(IMOVLConnectDelegate l) {
		this.listeners.add(l);
	}

	public void removeListener(IMOVLConnectDelegate l) {
		this.listeners.remove(l);
	}

	@Override
	public void onError(IMCResult result) {
		Log.i(Connect.LOG_TAG, "onError result:" + result);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onError(result);
		}
	}

	@Override
	public void onConnectionLost(IMCResult result) {
		Log.i(Connect.LOG_TAG, "onConnectionLost result:" + result);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onConnectionLost(result);
		}
	}

	@Override
	public void onCreateRoom(IMCResult result, IMCRoom room) {
		Log.i(Connect.LOG_TAG, "onCreateRoom result:" + result + "room:" + room);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onCreateRoom(result, room);
		}
	}

	@Override
	public void onJoinRoom(IMCResult result, IMCRoom room) {
		Log.i(Connect.LOG_TAG, "onJoinRoom result:" + result + " room:" + room);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onJoinRoom(result, room);
		}
	}

	@Override
	public void onLeaveRoom(IMCResult result) {
		Log.i(Connect.LOG_TAG, "onLeaveRoom result:" + result);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onLeaveRoom(result);
		}
	}

	@Override
	public void onUserJoined(IMCUser user) {
		Log.i(Connect.LOG_TAG, "onUserJoined user:" + user);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onUserJoined(user);
		}
	}

	@Override
	public void onUserLeft(IMCUser user) {
		Log.i(Connect.LOG_TAG, "onUserLeft user:" + user);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onUserLeft(user);
		}
	}

	@Override
	public void onMessage(IMCUser sender, String messageId, MCData messageData, String target) {
		Log.i(Connect.LOG_TAG, "onMessage2 sender:" + sender + " messageId:" + messageId + " messageData:"
				+ messageData + " target:" + target);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onMessage(sender, messageId, messageData, target);
		}
	}

	@Override
	public void onEjected(IMCUser sender, String reason) {
		Log.i(Connect.LOG_TAG, "onEjected sender:" + sender + " reason:" + reason);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onEjected(sender, reason);
		}
	}

	@Override
	public void onActiveHostChanged(IMCUser activeHost) {
		Log.i(Connect.LOG_TAG, "onActiveHostChanged activeHost:" + activeHost);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onActiveHostChanged(activeHost);
		}
	}

	@Override
	public void onRoomAttributesChanged(List<String> keys) {
		Log.i(Connect.LOG_TAG, "onRoomAttributesChange keys:" + keys);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onRoomAttributesChanged(keys);
		}
	}

	@Override
	public void onUserAttributesChanged(IMCUser user, List<String> keys) {
		Log.i(Connect.LOG_TAG, "onUserAttributesChange user:" + user + "keys:" + keys);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onUserAttributesChanged(user, keys);
		}
	}

	@Override
	public void onShutdownRoom() {
		Log.i(Connect.LOG_TAG, "onShutdownRoom");
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onShutdownRoom();
		}
	}

	@Override
	public void onPing(long start, long end, long length) {
		Log.i(Connect.LOG_TAG, "onPing start:" + start + " end:" + end + " length:" + length);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onPing(start, end, length);
		}
	}

	@Override
	public void onSystemBroadcast(String id, String message) {
		Log.i(Connect.LOG_TAG, "onSystemBroadcast id:" + id + " message:" + message);
		for (IMOVLConnectDelegate listener : listeners) {
			listener.onSystemBroadcast(id, message);
		}
	}

	//
	// util/helpers for app
	//
	public boolean connectionPresent() {
		NetworkInfo netInfo = cMgr.getActiveNetworkInfo();
		if ((netInfo != null) && (netInfo.getState() != null)) {
			return netInfo.getState().equals(State.CONNECTED);
		}
		return false;
	}
}
