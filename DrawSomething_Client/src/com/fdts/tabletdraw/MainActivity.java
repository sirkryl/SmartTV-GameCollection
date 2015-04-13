package com.fdts.tabletdraw;

import java.util.List;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

import com.movl.connect.IMOVLConnectDelegate;
import com.movl.connect.model.IMCResult;
import com.movl.connect.model.IMCRoom;
import com.movl.connect.model.IMCUser;
import com.movl.connect.model.MCData;

public abstract class MainActivity extends Activity implements IMOVLConnectDelegate {

	private static final int OPTIONS_MENU_LOGOUT = 0;

	protected Connect app;

	protected InputMethodManager imm;

	protected ProgressDialog dialog;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		app = (Connect) this.getApplication();

		dialog = new ProgressDialog(this);
		dialog.setCancelable(false);
		dialog.setMessage("");

		imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
	}

	@Override
	protected void onResume() {
		super.onResume();
		// NOTE, could do client login check here
		getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
		app.addListener(this);
	}

	@Override
	protected void onPause() {
		super.onPause();
		if (dialog != null) {
			dialog.dismiss();
		}
		app.removeListener(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0, MainActivity.OPTIONS_MENU_LOGOUT, 0, "Leave/Logout").setIcon(
				android.R.drawable.ic_menu_close_clear_cancel);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case OPTIONS_MENU_LOGOUT:
			app.getClient().leaveRoom();
			startActivity(new Intent(this, Login.class));
			break;
		}
		return false;
	}

	//
	// MOVLConnect empty callback events (so subclasses can override what they need)
	//

	@Override
	public void onConnectionLost(final IMCResult res) {
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if (dialog.isShowing()) {
					dialog.dismiss();
				}
				Toast.makeText(MainActivity.this, "CONNECTION LOST", Toast.LENGTH_SHORT).show();
				startActivity(new Intent(MainActivity.this, Login.class));
			}
		});
	}

	@Override
	public void onError(final IMCResult res) {
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if (dialog.isShowing()) {
					dialog.dismiss();
				}
				Toast.makeText(MainActivity.this, "ERROR:" + res.getMessage(), Toast.LENGTH_SHORT).show();
			}
		});
	}

	@Override
	public void onCreateRoom(IMCResult result, IMCRoom room) {
	}

	@Override
	public void onJoinRoom(IMCResult result, IMCRoom room) {
	}

	@Override
	public void onLeaveRoom(IMCResult result) {
	}

	@Override
	public void onUserJoined(IMCUser user) {
	}

	@Override
	public void onUserLeft(IMCUser user) {
	}

	@Override
	public void onMessage(IMCUser sender, String messageId, MCData messageData, String target) {
	}

	@Override
	public void onEjected(IMCUser sender, String reason) {
	}

	@Override
	public void onActiveHostChanged(IMCUser activeHost) {
	}

	@Override
	public void onRoomAttributesChanged(List<String> keys) {
	}

	@Override
	public void onUserAttributesChanged(IMCUser user, List<String> keys) {
	}

	@Override
	public void onShutdownRoom() {
	}

	@Override
	public void onPing(long start, long end, long length) {
	}

	@Override
	public void onSystemBroadcast(String id, String message) {
	}
}
