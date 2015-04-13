package com.fdts.combidraw;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.fdts.combidraw.R;
import com.movl.connect.model.IMCResult;
import com.movl.connect.model.IMCRoom;

public class Login extends MainActivity {

	private EditText name;

	private EditText code;

	private Button join;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login);

		code = (EditText) findViewById(R.id.login_code);
		name = (EditText) findViewById(R.id.login_name);
		join = (Button) findViewById(R.id.login_join);

		join.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (code.getText().toString().trim() != null && name.getText().toString().trim() != null) {
					dialog.setMessage("joining room...");
					dialog.show();
					app.getClient().joinRoomAsController(code.getText().toString().trim(),
							name.getText().toString().trim());
				}
				else {
					Toast.makeText(Login.this, "name and code are required", Toast.LENGTH_SHORT).show();
				}
			}
		});

	}

	//
	// Override ONLY IMOVLConnect delegate methods you're interested in (MyBaseActivity base class will handle rest)
	//

	// NOTE onLogin and onError are handled by base Activity

	@Override
	public void onJoinRoom(final IMCResult res, final IMCRoom room) {
		// must run back on UI thread, since MOVLConnect client makes network calls off of main thread
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if (res.getCode() == 0) {
					dialog.dismiss();
					startActivity(new Intent(Login.this, DrawActivity.class));
				}
				else {
					dialog.dismiss();
					Toast.makeText(Login.this, "Error, cannot join room, check room code", Toast.LENGTH_SHORT).show();
				}
			}
		});
	}

}
